import React, { FC, ComponentProps, useMemo, useRef } from "react";
import Slider from "react-slick";
import "./ShowcaseSlider.css";

import { IProduct } from "../../../store/products/types";
import Button from "../../elements/Button";
import { useDispatch } from "../../../hooks/useDispatch";
import { selectShowcaseProduct } from "../../../store/showcase/actions";

export interface ShowcaseCarouselProps extends ComponentProps<"div"> {
    products: IProduct[];
}

const ShowcaseCarousel: FC<ShowcaseCarouselProps> = ({ className = "", products, ...rest }) => {
    const dispatch = useDispatch();

    const sliderRef = useRef<Slider>(null);

    const list = useMemo(
        () => products.filter(({ image }) => typeof image === "string" && image.length > 1),
        [products]
    );

    const prev = (currentSlide: number, slideCount: number) => {
        if (!sliderRef.current) return;
        if (currentSlide <= 0) return sliderRef.current.slickGoTo(slideCount - 1);
        sliderRef.current.slickPrev();
    };
    const next = (currentSlide: number, slideCount: number) => {
        if (!sliderRef.current) return;
        if (currentSlide >= slideCount - 1) return sliderRef.current.slickGoTo(0);
        sliderRef.current.slickNext();
    };

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
        <Button
            {...props}
            className="slick-prev slick-arrow"
            type="button"
            onClick={() => prev(currentSlide, slideCount)}
        >
            Previous
        </Button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
        <Button
            {...props}
            className="slick-next slick-arrow"
            type="button"
            onClick={() => next(currentSlide, slideCount)}
        >
            Next
        </Button>
    );

    const settings = {
        dots: false,
        centerMode: true,
        speed: 500,
        slidesToShow:
            products.length === 5 ? 3 : products.length < 5 ? (products.length % 2 === 0 ? products.length - 1 : 1) : 5,
        nextArrow: <SlickArrowLeft />,
        prevArrow: <SlickArrowRight />,
        swipeToSlide: true,
        initialSlice: 0,
        beforeChange: (_, next) => dispatch(selectShowcaseProduct(products[next])),
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: products.length > 3 ? 3 : 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider ref={sliderRef} {...settings} style={{ marginTop: 80 }}>
            {list.map((product, index) => {
                return (
                    <div
                        key={product._id}
                        className="cursor-pointer !flex justify-center items-center w-full sm:w-[480px] h-[280px] image-wrapper"
                    >
                        <img
                            onClick={() => sliderRef.current.slickGoTo(index)}
                            src={product.image}
                            className="max-w-full max-h-full mx-auto object-contain duration-300 slider-image"
                            alt={product.name}
                        />
                    </div>
                );
            })}
        </Slider>
    );
};

export default ShowcaseCarousel;
