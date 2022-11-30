import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export interface AppSwitchProps extends ComponentProps<"div"> {
    enabled: boolean;
    setEnabled: any;
}

const AppSwitch: FC<AppSwitchProps> = ({ className = "", enabled, setEnabled, ...rest }) => {
    return (
        <Switch
            {...rest}
            as="div"
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
                "relative inline-flex h-[38px] bg-slate-700 w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
                { "!bg-accent": enabled, [className]: className }
            )}
        >
            <span
                aria-hidden="true"
                className={classNames(
                    "pointer-events-none inline-block h-[34px] translate-x-0 w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                    { "!translate-x-9": enabled }
                )}
            />
        </Switch>
    );
};

export default AppSwitch;
