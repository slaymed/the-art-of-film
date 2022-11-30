import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Button from "../elements/Button";

export interface ImagePreviewCardProps extends ComponentProps<"div"> {
    onDelete?: any;
    imageClasses?: string;
    image: string;
}

const ImagePreviewCard: FC<ImagePreviewCardProps> = ({
    image = "",
    className = "",
    imageClasses = "",
    onDelete,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("relative border border-accent border-dashed", {
                [className]: className,
            })}
        >
            <img
                src={image}
                alt="Preview"
                className={classNames("w-full object-contain", { [imageClasses]: imageClasses })}
            />
            {onDelete && (
                <div className="opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center bg-black/60 duration-300">
                    <Button type="button" onClick={onDelete} className="text-red-500">
                        <i className="fa-solid fa-trash text-2xl" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImagePreviewCard;
