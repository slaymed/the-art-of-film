import React, { FC, ComponentProps, useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TextHeader from "../../elements/TextHeader";
import Paragraph from "../../elements/Paragraph";
import Button from "../../elements/Button";
import CurrencyConvert from "../../kits/CurrencyConvert";
import LoadingBox from "../../kits/LoadingBox";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";

import { useDispatch } from "../../../hooks/useDispatch";

import { IProduct } from "../../../store/products/types";
import { user } from "../../../store/auth/selectors";
import { addToCart } from "../../../store/cart/thunks";
import { GlobalOperation, ThunkResponseType } from "../../../store/types";
import { ICart } from "../../../store/cart/types";
import { RequestLifeCycle } from "../../../store/enums";
import { addingToCart } from "../../../store/cart/selectors";

export interface ProductPageProps extends ComponentProps<"div"> {
    product: IProduct;
    reverse?: boolean;
}

const ProductPage: FC<ProductPageProps> = ({ className = "", product, reverse, ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { sellerId } = useParams();

    const adding = useSelector(addingToCart);
    const userInfo = useSelector(user);

    const [images, setImages] = useState([product.image, ...product.images]);
    const [selectedImage, setSelectedImage] = useState(product.image);

    const add = async () => {
        const res = await dispatch(addToCart(product._id));
        const { status } = res.payload as ThunkResponseType<ICart, GlobalOperation>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        navigate("/cart");
    };

    useEffect(() => {
        setSelectedImage(product.image);
        setImages([product.image, ...product.images]);
    }, [product]);

    return (
        <div
            {...rest}
            className={classNames("flex flex-col gap-8 bg-light-dark", {
                "lg:flex-row": !reverse,
                "lg:flex-row-reverse": reverse,
                [className]: className,
            })}
        >
            {images.length > 0 && (
                <div className="flex-1 flex h-full flex-col justify-between gap-4">
                    <div className="w-full border border-accent">
                        <img src={selectedImage} alt="Posetr Banner" className="w-full max-h-[700px] object-contain" />
                    </div>
                    <div className="h-[120px] w-full flex scroll-bar gap-4 overflow-x-auto">
                        {images.map((image) => (
                            <div
                                key={image}
                                className="h-full flex-shrink-0 cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} className="bg-cover h-full" alt="Poster Small Banner" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-1 flex-col justify-between gap-8">
                <div className="flex flex-col gap-8 flex-1">
                    <TextHeader className="text-4xl break-all sm:text-6xl text-accent lg:text-4xl xl:text-6xl line-clamp-1 hover:line-clamp-none">
                        {product.name}
                    </TextHeader>

                    {sellerId !== product.seller._id && (
                        <div className="flex flex-wrap items-center gap-4 justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <Paragraph className="text-slate-400 uppercase font-bold tracking-widest">
                                    Poster For Sale From
                                </Paragraph>
                                <Link to={`/seller/${product.seller._id}`}>
                                    <Paragraph className="uppercase underline text-accent font-bold tracking-widest underline-offset-2">
                                        {product.seller.name}
                                    </Paragraph>
                                </Link>
                            </div>
                            <Link to={`/seller/${product.seller._id}`}>
                                <Paragraph className="uppercase underline text-accent font-bold tracking-widest underline-offset-2">
                                    visite showcase
                                </Paragraph>
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {product.directors.length > 0 && (
                            <div className="flex gap-4 justify-between w-full">
                                <Paragraph className="text-lg text-accent capitalize">Directors</Paragraph>
                                <div className="flex flex-wrap gap-2 w-fit justify-end">
                                    {product.directors.map((d) => (
                                        <Paragraph
                                            key={d._id}
                                            className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {d.name}
                                        </Paragraph>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.casts.length > 0 && (
                            <div className="flex gap-4 justify-between">
                                <Paragraph className="text-lg text-accent capitalize">Casts</Paragraph>
                                <div className="flex flex-wrap gap-2 w-fit justify-end">
                                    {product.casts.map((c) => (
                                        <Paragraph
                                            key={c._id}
                                            className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {c.name}
                                        </Paragraph>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.artists.length > 0 && (
                            <div className="flex gap-4 justify-between">
                                <Paragraph className="text-lg text-accent capitalize">Artists</Paragraph>
                                <div className="flex flex-wrap gap-2 w-fit justify-end">
                                    {product.artists.map((a) => (
                                        <Paragraph
                                            key={a._id}
                                            className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded"
                                        >
                                            {a.name}
                                        </Paragraph>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.origin && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">Country of Origin</Paragraph>
                                <Paragraph className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded">
                                    {product.origin}
                                </Paragraph>
                            </div>
                        )}
                        {product.year && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">Year</Paragraph>
                                <Paragraph className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded">
                                    {product.year}
                                </Paragraph>
                            </div>
                        )}
                        {product.format && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">format</Paragraph>
                                <Paragraph className="py-0.5 px-2 bg-slate-500/20 text-slate-400 rounded">
                                    {product.format}
                                </Paragraph>
                            </div>
                        )}
                        {product.condition && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">condition</Paragraph>
                                <Paragraph className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded">
                                    {product.condition}
                                </Paragraph>
                            </div>
                        )}
                        {product.rolledFolded && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">rolledFolded</Paragraph>
                                <Paragraph className="py-0.5 px-2 capitalize bg-slate-500/20 text-slate-400 rounded">
                                    {product.rolledFolded}
                                </Paragraph>
                            </div>
                        )}
                        {product.description && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">description</Paragraph>
                                <Paragraph className="py-0.5 px-2 text-end capitalize bg-slate-500/20 text-slate-400 rounded line-clamp-1 hover:line-clamp-none">
                                    {product.description}
                                </Paragraph>
                            </div>
                        )}
                        {product.price && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">price</Paragraph>
                                <Paragraph
                                    className={classNames(
                                        "py-0.5 px-2 text-end capitalize bg-accent/20 text-accent rounded line-clamp-1 hover:line-clamp-none",
                                        { "line-through": product.salePrice }
                                    )}
                                >
                                    <CurrencyConvert amount={product.price} />
                                </Paragraph>
                            </div>
                        )}
                        {product.salePrice && (
                            <div className="flex gap-4 w-full justify-between">
                                <Paragraph className="text-lg text-accent capitalize">sale Price</Paragraph>
                                <Paragraph className="py-0.5 px-2 text-end capitalize bg-accent/20 text-accent rounded line-clamp-1 hover:line-clamp-none">
                                    <CurrencyConvert amount={product.salePrice} />
                                </Paragraph>
                            </div>
                        )}
                    </div>
                </div>
                {product.forSale &&
                    !product.sold &&
                    product.visible &&
                    userInfo &&
                    product.seller._id !== userInfo._id && (
                        <div className="flex flex-col gap-4">
                            {adding.loading && <LoadingBox />}
                            <ErrorWithRedirect {...adding} />

                            <Button className="py-3 px-6 bg-accent" onClick={add}>
                                <Paragraph className="text-2xl font-bold text-black tracking-wider">
                                    Add To Cart
                                </Paragraph>
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ProductPage;
