import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { shopTotalCount } from "../../store/shop/selectors";

export interface ShopTotalCountProps extends ComponentProps<"span"> {}

const ShopTotalCount: FC<ShopTotalCountProps> = ({ className = "", ...rest }) => {
    const total = useSelector(shopTotalCount);

    return (
        <span {...rest} className={classNames("text-sm text-accent tracking-widest", { [className]: className })}>
            {total} Total Result
        </span>
    );
};

export default memo(ShopTotalCount);
