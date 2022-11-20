import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import { available } from "../helpers/available.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
import { syncArtistes, syncCasts, syncDirectors } from "./tagsRouter.js";

const productRouter = express.Router();

// Filters
productRouter.get(
    "/search",
    expressAsyncHandler(async (req, res) => {
        const { query } = req;

        const name = query.name !== undefined ? query.name : "";
        const directors = query.directors !== undefined && query.directors !== "" ? [query.directors] : [];
        const casts = query.casts !== undefined && query.casts !== "" ? [query.casts] : [];
        const artists = query.artists !== undefined && query.artists !== "" ? [query.artists] : [];
        const origin = query.origin !== undefined ? query.origin : "";
        const format = query.format !== undefined ? query.format : "";
        const rolledFolded = query.rolledFolded !== undefined ? query.rolledFolded : "";
        const condition = query.condition !== undefined ? query.condition : "";
        const price = query.price !== undefined ? query.price : "";
        const sold = query.sold !== undefined ? query.sold : false;

        if (name !== "") {
            var nameFilter =
                name && name !== ""
                    ? {
                          name: {
                              $regex: name,
                              $options: "i",
                          },
                      }
                    : {};
        }

        if (directors && directors.length > 0) {
            var directorFilter =
                directors && directors.length > 0
                    ? {
                          directors: {
                              $in: directors,
                          },
                      }
                    : {};
        }

        if (casts && casts.length > 0) {
            var castFilter =
                casts && casts.length > 0
                    ? {
                          casts: {
                              $in: casts,
                          },
                      }
                    : {};
        }

        if (artists && artists.length > 0) {
            var artistFilter =
                artists && artists.length > 0
                    ? {
                          artists: {
                              $in: artists,
                          },
                      }
                    : {};
        }

        if (origin !== "") {
            var originFilter =
                origin && origin !== ""
                    ? {
                          origin: {
                              $regex: origin,
                              $options: "i",
                          },
                      }
                    : {};
        }

        if (format !== "") {
            var formatFilter =
                format && format !== ""
                    ? {
                          format: {
                              $regex: format,
                              $options: "i",
                          },
                      }
                    : {};
        }

        if (rolledFolded !== "") {
            var rolledFoldedFilter =
                rolledFolded && rolledFolded !== ""
                    ? {
                          rolledFolded: {
                              $regex: rolledFolded,
                              $options: "i",
                          },
                      }
                    : {};
        }

        if (condition !== "") {
            var conditionFilter =
                condition && condition !== ""
                    ? {
                          condition: {
                              $regex: condition,
                              $options: "i",
                          },
                      }
                    : {};
        }

        if (price !== "") {
            var priceFilter =
                price && price !== 0
                    ? {
                          price: {
                              $gte: Number(price.split("-")[0]),
                              $lte: Number(price.split("-")[1]),
                          },
                      }
                    : {};
        }

        if (sold !== "") {
            var soldFilter =
                sold && sold !== ""
                    ? {
                          sold: {
                              $eq: Boolean(sold),
                          },
                      }
                    : {};
        }

        const filters = {
            ...nameFilter,
            ...directorFilter,
            ...castFilter,
            ...artistFilter,
            ...originFilter,
            ...formatFilter,
            ...rolledFoldedFilter,
            ...conditionFilter,
            ...priceFilter,
            ...soldFilter,
        };

        const products = await Product.find({ ...filters })
            .populate("seller", "seller")
            .sort({ createdAt: -1 })
            .where("forSale", true)
            .where("visible", true);

        const filteredProducts = [];

        for (const product of products) {
            if (!product.seller) continue;
            product.seller = product.seller._id;
            filteredProducts.push(product);
        }

        res.send({ products: filteredProducts, countProducts: 0 });
    })
);

productRouter.get(
    "/list/home",
    expressAsyncHandler(async (req, res) => {
        try {
            const products = await Product.find()
                .sort({ createdAt: -1 })
                .where("forSale", true)
                .where("visible", true)
                .where("sold", false)
                .populate("seller")
                .populate("directors")
                .populate("casts")
                .populate("artists");

            const sortedList = products.sort((a, b) => a.name.localeCompare(b.name));

            return res.status(200).json(sortedList);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })
);

productRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const pageSize = 6;
        const page = +req.query.pageNumber || 1;
        const count = await Product.count({
            forSale: true,
            visible: true,
            sold: false,
        }).exec();

        const products = await Product.find()
            .sort({ createdAt: -1 })
            .where("forSale", true)
            .where("visible", true)
            .where("sold", false)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate("seller", "seller.name seller.logo")
            .populate("directors")
            .populate("casts")
            .populate("artists")
            .then((products) => {
                const sorted_alphabetically = products.sort((a, b) => a.name.localeCompare(b.name));
                return sorted_alphabetically;
            });
        res.send({
            products,
            count,
            page,
            pages: Math.ceil(count / pageSize),
        });
    })
);

productRouter.get(
    "/seller/:id",
    expressAsyncHandler(async (req, res) => {
        const pageSize = 6;
        const page = +req.query.pageNumber || 1;
        const sold = req.query.sold || false;
        const showcase = req.query.showcase || false;

        const count = await Product.count({ seller: req.params.id, sold }).exec();

        if (showcase === "true") {
            const products = await Product.find({ seller: req.params.id })
                .sort({ createdAt: -1 })
                .where("visible", true)
                .where("sold", false)
                // .limit(pageSize)
                // .skip(pageSize * (page - 1))
                .populate("seller", "seller.name seller.logo")
                .populate("directors", "name")
                .populate("casts", "name")
                .populate("artists", "name")
                .then((products) => {
                    const sorted_alphabetically = products.sort((a, b) => a.name.localeCompare(b.name));
                    return sorted_alphabetically;
                });

            res.send({ products, page, pages: Math.ceil(count / pageSize) });
        } else {
            const products = await Product.find({ seller: req.params.id })
                .sort({ createdAt: -1 })
                .where("sold", false)
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .populate("seller", "seller.name seller.logo")
                .populate("directors")
                .populate("casts")
                .populate("artists")
                .then((products) => {
                    const sorted_alphabetically = products.sort((a, b) => a.name.localeCompare(b.name));
                    return sorted_alphabetically;
                });

            res.send({ products, page, pages: Math.ceil(count / pageSize) });
        }
    })
);

productRouter.get(
    "/origins",
    expressAsyncHandler(async (req, res) => {
        const origins = await Product.find().distinct("origin");
        res.send(origins);
    })
);

productRouter.get(
    "/formats",
    expressAsyncHandler(async (req, res) => {
        const formats = await Product.find().distinct("format");
        res.send(formats);
    })
);
productRouter.get(
    "/conditions",
    expressAsyncHandler(async (req, res) => {
        const conditions = await Product.find().distinct("condition");
        res.send(conditions);
    })
);

productRouter.get(
    "/rolledFoldeds",
    expressAsyncHandler(async (req, res) => {
        const rolledFoldeds = await Product.find().distinct("rolledFolded");
        res.send(rolledFoldeds);
    })
);

productRouter.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        try {
            const seller = await User.findById("63739354e26415be9a2e0475");
            if (!seller) return res.status(404).json({ message: "Seller Not Found" });

            const products = data.products.map((product) => ({
                ...product,
                seller: seller._id,
            }));
            return res.status(200).json(await Product.insertMany(products));
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

productRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
            .populate("seller")
            .populate("directors")
            .populate("casts")
            .populate("artists");

        if (!product) return res.status(404).send({ message: "Product Not Found" });

        return res.send(product);
    })
);

productRouter.get(
    "/list/mine",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const products = await Product.find({ seller: req.user._id })
                .sort({ createdAt: -1 })
                .where("sold", false)
                .populate("seller")
                .populate("casts")
                .populate("artists")
                .populate("directors");

            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

productRouter.post(
    "/create",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = req.user;
        let { price, salePrice, casts, artistes, directors, forSale, name, rolledFolded, ...rest } = req.body;

        if (typeof name !== "string" || !name.trim())
            return res.status(401).json({ message: "Name must not be empty" });

        if (rolledFolded !== "Rolled" && rolledFolded !== "Folded")
            return res.status(401).json({ message: "Please Apply Rolled or Folded" });

        try {
            price = parseFloat(price);
            salePrice = parseFloat(salePrice);

            if (isNaN(price)) price = 0;
            if (isNaN(salePrice)) salePrice = 0;

            const syncedCasts = await syncCasts(Array.from(new Set(casts)));
            const syncedArtistes = await syncArtistes(Array.from(new Set(artistes)));
            const syncedDirectors = await syncDirectors(Array.from(new Set(directors)));

            const product = new Product({
                price,
                forSale,
                salePrice,
                casts: syncedCasts,
                artists: syncedArtistes,
                directors: syncedDirectors,
                name,
                rolledFolded,
                seller: user,
                ...rest,
            });

            return res.status(201).json(await product.save());
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

productRouter.post(
    "/update",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = req.user;
        let {
            price,
            salePrice,
            name,
            image,
            images,
            marketValue,
            casts,
            origin,
            year,
            format,
            condition,
            rolledFolded,
            countInStock,
            description,
            artistes,
            directors,
            visible,
            forSale,
            productId,
        } = req.body;

        if (typeof name !== "string" || !name.trim())
            return res.status(401).json({ message: "Name must not be empty" });

        if (rolledFolded !== "Rolled" && rolledFolded !== "Folded")
            return res.status(401).json({ message: "Please Apply Rolled or Folded" });

        try {
            const product = await Product.findById(productId)
                .populate("seller")
                .populate("directors")
                .populate("casts")
                .populate("artists");

            if (!product) return res.status(404).json({ message: "Poster not found", redirect: "/posters/seller" });
            if (product.seller._id.toString() !== user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });
            if (product.sold)
                return res
                    .status(401)
                    .json({ message: "Poster Already Sold", redirect: `/product/${product._id.toString()}` });

            price = parseFloat(price);
            salePrice = parseFloat(salePrice);

            if (isNaN(price)) price = 0;
            if (isNaN(salePrice)) salePrice = 0;

            const syncedCasts = await syncCasts(Array.from(new Set(casts)));
            const syncedArtistes = await syncArtistes(Array.from(new Set(artistes)));
            const syncedDirectors = await syncDirectors(Array.from(new Set(directors)));

            if (available(name)) product.name = name;
            if (available(image)) product.image = image;
            if (available(images)) product.images = images;
            if (available(marketValue)) product.marketValue = marketValue;
            if (available(origin)) product.origin = origin;
            if (available(year)) product.year = year;
            if (available(format)) product.format = format;
            if (available(condition)) product.condition = condition;
            if (available(rolledFolded)) product.rolledFolded = rolledFolded;
            if (available(countInStock)) product.countInStock = countInStock;
            if (available(price)) product.price = price;
            if (available(salePrice)) product.salePrice = salePrice;
            if (available(description)) product.description = description;
            if (available(visible)) product.visible = visible;
            if (available(forSale)) product.forSale = forSale;

            product.casts = syncedCasts;
            product.artists = syncedArtistes;
            product.directors = syncedDirectors;

            return res.status(200).json(await product.save());
        } catch (error) {}
    })
);

productRouter.post(
    "/delete",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const { productId } = req.body;

        try {
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ message: "Poster not found, please refresh posters list" });
            if (product.seller.toString() !== req.user._id.toString())
                return res.status(401).json({ message: "Unauthorized" });
            if (product.sold) return res.status(401).json({ message: "Can't Remove Already Sold Poster" });

            await product.remove();

            return res.status(200).json({ _id: productId });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

productRouter.get(
    "/single/:productId",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const { productId } = req.params;

        try {
            const product = await Product.findById(productId)
                .populate("seller")
                .populate("directors")
                .populate("artists")
                .populate("casts");
            if (!product) return res.status(404).json({ message: "Poster not found" });

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
);

productRouter.post(
    "/:id/reviews",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.name === req.user.name)) {
                return res.status(400).send({ message: "You already submitted a review" });
            }
            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: "Review Created",
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: "Product Not Found" });
        }
    })
);

export default productRouter;
