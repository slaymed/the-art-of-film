import React, { FC, ComponentProps, useState } from "react";
import classNames from "classnames";
import TextHeader from "../elements/TextHeader";

export interface GrahamGalleryPageProps extends ComponentProps<"div"> {}

export type selectedImage = { url: string; aspect: string };

const GrahamGalleryPage: FC<GrahamGalleryPageProps> = ({ className = "", ...rest }) => {
    const [selectedImage, setSelectedImage] = useState<selectedImage | null>(null);

    return (
        <div {...rest} className={classNames("container p-8 mx-auto xl:px-32", { [className]: className })}>
            <div style={{ padding: 100 }}>
                <TextHeader className="text-3xl text-center sm:text-6xl">
                    <span className="text-accent">Graham</span> Gallery
                </TextHeader>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-1.jpeg", aspect: "aspect-9/16" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-1.jpeg"
                        />
                    </div>

                    <div className="col-span-2 grid-rows-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-3.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-3.jpeg"
                                />
                            </div>
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-4.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-4.jpeg"
                                />
                            </div>

                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-5.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-5.jpeg"
                                />
                            </div>
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-7.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-7.jpeg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 grid-rows-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-9.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-9.jpeg"
                                />
                            </div>
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-11.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-11.jpeg"
                                />
                            </div>

                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-12.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-12.jpeg"
                                />
                            </div>
                            <div
                                className="col-span-1 cursor-pointer"
                                onClick={() =>
                                    setSelectedImage({
                                        url: "/images/graham-gallery/image-14.jpeg",
                                        aspect: "aspect-video",
                                    })
                                }
                            >
                                <img
                                    alt="Artiste Work"
                                    className="w-full h-full border-2 md:border-4 border-accent"
                                    src="/images/graham-gallery/image-14.jpeg"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-6.jpeg", aspect: "aspect-9/16" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-6.jpeg"
                        />
                    </div>
                </div>

                <div className="grid-cols-2 grid gap-4">
                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-13.jpeg", aspect: "aspect-9/16" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-13.jpeg"
                        />
                    </div>

                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-1.jpeg", aspect: "aspect-9/16" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-1.jpeg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-2.jpeg", aspect: "aspect-video" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-2.jpeg"
                        />
                    </div>
                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-8.jpeg", aspect: "aspect-video" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-8.jpeg"
                        />
                    </div>

                    <div
                        className="col-span-1 cursor-pointer"
                        onClick={() =>
                            setSelectedImage({ url: "/images/graham-gallery/image-10.jpeg", aspect: "aspect-video" })
                        }
                    >
                        <img
                            alt="Artiste Work"
                            className="w-full h-full border-2 md:border-4 border-accent"
                            src="/images/graham-gallery/image-10.jpeg"
                        />
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 flex cursor-pointer justify-center items-center bg-black/90 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="w-full h-full max-w-[1200px] max-h-[720px] flex justify-center items-center p-8">
                        <img
                            alt="Artiste Work"
                            src={selectedImage.url}
                            className={classNames("max-w-full max-h-full border-8 border-accent")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrahamGalleryPage;
