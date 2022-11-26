import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import TextHeader from "../components/elements/TextHeader";
import { Link, useParams } from "react-router-dom";
import { fetchingAdvertisements, selectAdvertiseById } from "../store/advertisements/selectors";
import Page from "../components/pages/Page";
import LoadingBox from "../components/kits/LoadingBox";
import { useSelector } from "react-redux";
import MessageBox from "../components/kits/MessageBox";
import CreateEditAdvertiseForm from "../components/forms/CreateEditAdvertiseForm";
import Paragraph from "../components/elements/Paragraph";

export interface EditAdvertiseScreenProps extends ComponentProps<"div"> {}

const EditAdvertiseScreen: FC<EditAdvertiseScreenProps> = ({ className = "", ...rest }) => {
    const { advertisementId } = useParams();

    const advertisement = useSelector(selectAdvertiseById(advertisementId));
    const fetching = useSelector(fetchingAdvertisements);

    if (fetching.loading)
        return (
            <Page>
                <LoadingBox />
            </Page>
        );

    if (fetching.errors.message)
        return (
            <Page>
                <MessageBox>{fetching.errors.message}</MessageBox>
            </Page>
        );

    if (!advertisement)
        return (
            <Page>
                <MessageBox>Advertisement Not Found</MessageBox>
            </Page>
        );

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <div className="w-full max-w-4xl mx-auto flex-col flex gap-8">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <TextHeader className="text-3xl text-accent">Edit Advertisement</TextHeader>
                    <Link to={`/advertisement/${advertisement._id}`}>
                        <Paragraph className="text-sm text-accent underline underline-offset-2">
                            Open Advetisement
                        </Paragraph>
                    </Link>
                </div>

                <CreateEditAdvertiseForm
                    initialState={{
                        image: advertisement.image,
                        images: advertisement.images,
                        link: advertisement.link,
                        paragraphs: advertisement.paragraphs,
                        private_key: advertisement.private_key || "",
                        title: advertisement.title,
                        type: advertisement.type,
                        advertisementId: advertisement._id,
                    }}
                    operation="edit"
                    price_for_day={0}
                />
            </div>
        </Page>
    );
};

export default EditAdvertiseScreen;
