import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { createPoster } from "../store/products/thunks";
import { CreateEditPosterVars } from "../store/products/types";
import { creatingProduct } from "../store/products/selectors";

import PageLayout from "../layout/PageLayout";
import CreateEditPosterForm from "../components/forms/CreateEditPosterForm";

const initailState: CreateEditPosterVars = {
    artists: [],
    casts: [],
    directors: [],
    condition: "",
    description: "",
    format: "",
    forSale: false,
    image: "",
    images: [],
    marketValue: 0,
    name: "",
    visible: true,
    origin: "",
    price: "",
    salePrice: "",
    year: new Date().getFullYear(),
};

export interface CreatePosterScreenProps extends ComponentProps<"div"> {}

const CreatePosterScreen: FC<CreatePosterScreenProps> = ({ className = "", ...rest }) => {
    const creating = useSelector(creatingProduct);

    return (
        <PageLayout>
            <div {...rest} className={classNames("bg-light-dark w-full p-8 sm:p-16", { [className]: className })}>
                <CreateEditPosterForm
                    thunk={createPoster}
                    initialState={initailState}
                    operation={creating}
                    formTitle="Create Poster"
                    resetVars
                />
            </div>
        </PageLayout>
    );
};

export default CreatePosterScreen;
