import React, { FC, ComponentProps, useState, Fragment, useEffect } from "react";
import classNames from "classnames";
import TextHeader from "../components/elements/TextHeader";
import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { AdvertisementType } from "../store/advertisements/enums";
import CreateEditAdvertiseForm from "../components/forms/CreateEditAdvertiseForm";
import { CreateEditAdvertiseVars } from "../store/advertisements/types";
import { useSelector } from "react-redux";
import { websiteSettings } from "../store/settings/selectors";
import { useDispatch } from "../hooks/useDispatch";
import { resetCreateAdvertiseErrors } from "../store/advertisements/actions";
import Page from "../components/pages/Page";

export interface CreateAdvertiseScreenProps extends ComponentProps<"div"> {}

const initialState: CreateEditAdvertiseVars = {
    image: "",
    link: "",
    title: "",
};

const CreateAdvertiseScreen: FC<CreateAdvertiseScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const settings = useSelector(websiteSettings);

    const [usp, setUsp] = useSearchParams();
    const pannel = (usp.get("pannel") || AdvertisementType.SPONSOR) as AdvertisementType;

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        dispatch(resetCreateAdvertiseErrors());
        switch (pannel) {
            case AdvertisementType.SPONSOR:
                setTabIndex(0);
                break;
            case AdvertisementType.BANNER:
                setTabIndex(1);
                break;
            case AdvertisementType.ADVERTORIAL:
                setTabIndex(2);
                break;
            default:
                setTabIndex(0);
        }
    }, [usp, setTabIndex]);

    return (
        <Page {...rest} className={className}>
            <div className="flex flex-col max-w-4xl mx-auto gap-8 form w-full">
                <TextHeader className="text-3xl text-accent tracking-widest">Create Advertisement</TextHeader>

                <Tab.Group as="div" className="flex flex-col gap-8" selectedIndex={tabIndex}>
                    <Tab.List className="w-full flex flex-col sm:flex-row items-center bg-dark-card">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: AdvertisementType.SPONSOR })}
                                    className={classNames("w-full py-3 px-6 duration-200", {
                                        "bg-accent text-black font-bold": selected,
                                    })}
                                >
                                    Sponsored Links
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: AdvertisementType.BANNER })}
                                    className={classNames("w-full py-3 px-6 duration-200", {
                                        "bg-accent text-black font-bold": selected,
                                    })}
                                >
                                    Home Page Banner
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    type="button"
                                    onClick={() => setUsp({ pannel: AdvertisementType.ADVERTORIAL })}
                                    className={classNames("w-full py-3 px-6 duration-200", {
                                        "bg-accent text-black font-bold": selected,
                                    })}
                                >
                                    Advertorial
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <CreateEditAdvertiseForm
                                initialState={{ ...initialState, type: AdvertisementType.SPONSOR, period_days: "30" }}
                                price_for_day={settings?.sponsor_price_for_day || 0.8}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <CreateEditAdvertiseForm
                                initialState={{ ...initialState, type: AdvertisementType.BANNER, period_days: "30" }}
                                price_for_day={settings?.banner_price_for_day || 1.5}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <CreateEditAdvertiseForm
                                initialState={{
                                    ...initialState,
                                    type: AdvertisementType.ADVERTORIAL,
                                    paragraphs: [""],
                                    images: [],
                                    period_days: "60",
                                }}
                                price_for_day={settings?.advertorial_price_for_day || 2}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </Page>
    );
};

export default CreateAdvertiseScreen;
