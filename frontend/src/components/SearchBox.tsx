import React, { FC, ComponentProps, useState, FormEvent } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import Button from "./elements/Button";
import AppInput from "./elements/AppInput";

export interface SearchBoxProps extends ComponentProps<"form"> {}

const SearchBox: FC<SearchBoxProps> = ({ className = "", ...rest }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/shop/name/${name}`);
    };

    return (
        <form
            {...rest}
            className={classNames("flex flex-shrink-0 w-full justify-center text-black", { [className]: className })}
            onSubmit={(e) => submitHandler}
        >
            <AppInput
                type="text"
                className="w-full max-w-sm px-4 bg-white"
                name="name"
                id="name"
                placeholder="Search Poster"
                onChange={(e) => setName(e.target.value)}
            />
            <Button className="flex items-center justify-center w-12 h-12 bg-accent" type="submit">
                <i className="fa fa-search" />
            </Button>
        </form>
    );
};

export default SearchBox;
