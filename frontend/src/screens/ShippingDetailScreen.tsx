import React, { FC, ComponentProps, FormEvent, useState, ChangeEvent } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { updatingProfile, user } from "../store/auth/selectors";
import { User } from "../store/auth/types";

import Paragraph from "../components/elements/Paragraph";
import PageLayout from "../layout/PageLayout";
import Button from "../components/elements/Button";
import CurrencyInput from "../components/elements/CurrencyInput";
import CurrencyConvert from "../components/kits/CurrencyConvert";
import { useDispatch } from "../hooks/useDispatch";
import { updateProfile } from "../store/auth/thunks";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import { countrySelectDefaultOption, countrySelectOptions } from "../data";

export interface ShippingDetailScreenProps extends ComponentProps<"div"> {}

const initialState = { key: "", rolled: 0, folded: 0 };

const ShippingDetailScreen: FC<ShippingDetailScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const updating = useSelector(updatingProfile);
    const userInfo = useSelector(user) as User;
    const [newVars, setNewVars] = useState(initialState);
    const [costs, setCosts] = useState(userInfo.rolled_folded_shipping_cost);
    const [vars, setVars] = useState<typeof initialState>(initialState);

    const handleNewVarsChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setNewVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const submitNewVarsChange = () => {
        if (!newVars.key) return;
        const rolled = newVars.rolled || 0;
        const folded = newVars.folded || 0;
        setCosts((prev) => ({ ...prev, [newVars.key]: { rolled, folded } }));
        setNewVars(initialState);
    };

    const handleVarsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseFloat(event.target.value) : "";
        setVars((prev) => ({ ...prev, [event.target.name]: value }));
    };

    const submitVarsChange = () => {
        if (!vars.key) return;
        const rolled = vars.rolled || 0;
        const folded = vars.folded || 0;
        setCosts((prev) => ({ ...prev, [vars.key]: { rolled, folded } }));
        setVars(initialState);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (vars.key) return;

        dispatch(updateProfile({ rolled_folded_shipping_cost: costs }));
    };

    const remove = (key: string) => {
        const clone = { ...costs };
        delete clone[key];
        setCosts(clone);
    };

    return (
        <PageLayout>
            <div {...rest} className={classNames("bg-light-dark py-24 w-full px-8", { [className]: className })}>
                <form onSubmit={handleSubmit} className="flex flex-col max-w-4xl mx-auto gap-8 form w-full">
                    <Paragraph className="text-4xl sm:text-6xl font-bold line-clamp-2 hover:line-clamp-none tracking-widest text-accent uppercase">
                        Shipping Detail
                    </Paragraph>

                    <div className="flex flex-col gap-4 pb-8">
                        <Paragraph className="text-slate-400">
                            Add in your shipping cost information here. You can add in a fixed shipping cost (postage
                            and packaging) for rolled and folded posters being sent to any country worldwide.
                        </Paragraph>
                        <Paragraph className="text-slate-400">
                            If you do not add in an amount a default £15 will be applied to the check out. You control
                            your shipping costs, and you can edit this information at any-time.
                        </Paragraph>
                        <Paragraph className="text-slate-400">
                            Shipping (and taxes) are not the responsibility of the Art of Film and we do not take any
                            commission on shipping costs.
                        </Paragraph>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <select
                            name="key"
                            id="country"
                            className="bg-slate-700 rounded text-sm px-2 py-1.5 text-white/80"
                            placeholder="Select Country"
                            defaultValue={countrySelectDefaultOption.label}
                            required
                            onChange={handleNewVarsChange}
                        >
                            {countrySelectOptions.map(({ label, value }) => (
                                <option key={value} value={label}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <CurrencyInput
                            name="rolled"
                            type="text"
                            row
                            placeholder="Rolled (GBP)"
                            className="bg-slate-700 rounded py-1.5 px-2 !text-white"
                            required
                            value={vars.rolled}
                            onChange={handleVarsChange}
                        />
                        <CurrencyInput
                            name="folded"
                            type="text"
                            row
                            placeholder="Folded (GBP)"
                            className="bg-slate-700 rounded py-1.5 px-2 !text-white"
                            required
                            value={vars.folded}
                            onChange={handleVarsChange}
                        />
                        {newVars.key && (
                            <Button
                                className="text-accent w-full rounded py-1.5 px-2 bg-accent/20"
                                onClick={submitNewVarsChange}
                            >
                                <Paragraph>Add</Paragraph>
                            </Button>
                        )}
                    </div>

                    <div className="w-full max-h-[600px] overflow-auto scroll-bar border border-dark-card">
                        <table className="w-full">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr className="bg-dark-card">
                                    <th>
                                        <Paragraph className="text-accent p-4 font-bold tracking-wider text-start">
                                            Country
                                        </Paragraph>
                                    </th>
                                    <th>
                                        <Paragraph className="text-accent p-4 font-bold tracking-wider text-start">
                                            Rolled
                                        </Paragraph>
                                    </th>
                                    <th>
                                        <Paragraph className="text-accent p-4 font-bold tracking-wider text-start">
                                            Folded
                                        </Paragraph>
                                    </th>
                                    <th>
                                        <Paragraph className="text-accent p-4 font-bold tracking-wider text-start">
                                            Actions
                                        </Paragraph>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(costs).map(([key, value]) => {
                                    if (key === "default") return null;

                                    return (
                                        <tr key={key} className="border-b border-dark-card last-of-type:border-b-0">
                                            <td>
                                                {vars.key === key ? (
                                                    <div className="p-4">
                                                        <Paragraph className="bg-blue-500/20 text-blue-500 rounded text-sm font-bold tracking-wider capitalize py-0.5 px-2 w-fit">
                                                            {key}
                                                        </Paragraph>
                                                    </div>
                                                ) : (
                                                    <Paragraph className="text-slate-300 p-4 text-sm font-bold tracking-wider text-start capitalize">
                                                        {key}
                                                    </Paragraph>
                                                )}
                                            </td>
                                            <td>
                                                {vars.key === key ? (
                                                    <div className="p-4 w-fit">
                                                        <CurrencyInput
                                                            name="rolled"
                                                            type="text"
                                                            row
                                                            placeholder="Rolled (GBP)"
                                                            className="w-24 text-sm bg-slate-700 rounded py-0.5 px-2 !text-white"
                                                            required
                                                            value={vars.rolled}
                                                            onChange={handleVarsChange}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Paragraph className="text-slate-300 p-4 font-bold tracking-wider text-start text-sm">
                                                        <CurrencyConvert amount={value.rolled} />
                                                    </Paragraph>
                                                )}
                                            </td>
                                            <td>
                                                {vars.key === key ? (
                                                    <div className="p-4 w-fit">
                                                        <CurrencyInput
                                                            name="folded"
                                                            type="text"
                                                            row
                                                            placeholder="Folded (GBP)"
                                                            className="w-24 text-sm bg-slate-700 rounded py-0.5 px-2 !text-white"
                                                            required
                                                            value={vars.folded}
                                                            onChange={handleVarsChange}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Paragraph className="text-slate-300 p-4 font-bold tracking-wider text-start text-sm">
                                                        <CurrencyConvert amount={value.folded} />
                                                    </Paragraph>
                                                )}
                                            </td>
                                            <td>
                                                {vars.key === key ? (
                                                    <Button
                                                        className="p-4 text-green-500"
                                                        type="button"
                                                        onClick={submitVarsChange}
                                                    >
                                                        <i className="text-lg fa-solid fa-check" />
                                                    </Button>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <Button
                                                            type="button"
                                                            className="p-4 text-accent/80"
                                                            onClick={() => setVars({ key, ...value })}
                                                        >
                                                            <i className="fa-solid fa-edit" />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            className="p-4 text-red-500"
                                                            onClick={() => remove(key)}
                                                        >
                                                            <i className="fa-solid fa-trash" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <ErrorWithRedirect {...updating} />

                    {!vars.key && (
                        <Button className="py-3 px-6 bg-accent w-28" type="submit">
                            {updating.loading ? (
                                <LoadingBox className="text-black !text-xl mx-auto w-fit" />
                            ) : (
                                <Paragraph className="font-bold text-black tracking-wider">Update</Paragraph>
                            )}
                        </Button>
                    )}
                </form>
            </div>
        </PageLayout>
    );
};

export default ShippingDetailScreen;
