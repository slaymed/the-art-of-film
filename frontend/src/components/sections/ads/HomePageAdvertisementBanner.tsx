import React, { FC, ComponentProps, useEffect, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { homeScreenAdvertisementBanner } from "../../../store/advertisements/selectors";
import { fetchHomeScreenAdvertisementBanner } from "../../../store/advertisements/thunk";

import { useDispatch } from "../../../hooks/useDispatch";
import Paragraph from "../../elements/Paragraph";

export interface HomePageAdvertisementBannerProps extends ComponentProps<"div"> {}

const HomePageAdvertisementBanner: FC<HomePageAdvertisementBannerProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const banner = useSelector(homeScreenAdvertisementBanner);

    useEffect(() => {
        dispatch(fetchHomeScreenAdvertisementBanner());
    }, [dispatch]);

    if (!banner) return null;

    return (
        <a href={banner.link} target="_blank" rel="noreferrer">
            <div
                {...rest}
                className={classNames("relative group w-full h-[400px] bg-dark-card bg-cover", {
                    [className]: className,
                })}
                style={{ backgroundImage: `url(${banner.image})` }}
            >
                <div className="w-full h-full backdrop-blur-md bg-black/60">
                    <img src={banner.image} alt="Advertisement Banner" className="w-full h-full object-scale-down" />
                </div>
                <div className="absolute inset-0 bg-black/50 hover:opacity-0 duration-500 flex justify-center items-center">
                    <Paragraph className="text-accent w-2/3 text-center line-clamp-1 font-bold tracking-widest uppercase text-4xl">
                        {banner.title}
                    </Paragraph>
                </div>
                <div className="absolute right-4 bottom-4 group-hover:opacity-0 duration-500">
                    <Paragraph className="text-green-500 py-1 px-2 rounded bg-green-500/20 font-bold tracking-widest uppercase text-sm">
                        Sponsored Banner
                    </Paragraph>
                </div>
            </div>
        </a>
    );
};

export default memo(HomePageAdvertisementBanner);
