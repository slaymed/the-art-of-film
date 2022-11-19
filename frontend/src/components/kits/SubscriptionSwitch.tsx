import React, { FC, ComponentProps, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export interface SubscriptionSwitchProps extends ComponentProps<"div"> {
    enabled: boolean;
    setEnabled: Dispatch<SetStateAction<boolean>>;
}

const SubscriptionSwitch: FC<SubscriptionSwitchProps> = ({ className = "", enabled, setEnabled, ...rest }) => {
    return (
        <Switch
            {...rest}
            checked={enabled}
            onChange={setEnabled}
            className="w-48 relative flex items-center p-1 rounded-full border-2 border-white"
            as="div"
        >
            <div
                className={classNames(
                    "absolute w-24 top-1 transform duration-200 bottom-1 left-1 rounded-full bg-accent",
                    {
                        "translate-x-21": enabled,
                    }
                )}
            />
            <span
                className={classNames(
                    "z-10 cursor-pointer select-none duration-200 pt-0.5 w-1/2 line-clamp-1 block text-center rounded-full",
                    {
                        "text-black": !enabled,
                    }
                )}
            >
                Monthly
            </span>
            <span
                className={classNames(
                    "z-10 cursor-pointer select-none duration-200 pt-0.5 w-1/2 line-clamp-1 block text-center rounded-full",
                    {
                        "text-black": enabled,
                    }
                )}
            >
                Annual
            </span>
        </Switch>
    );
};

export default SubscriptionSwitch;
