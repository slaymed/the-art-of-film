import { GlobalOperation } from "../types";
import { AdvertismentType } from "./enums";

export type Advertisment = {
    _id: string;
    type: AdvertismentType;
    title: string;
    link: string;
    image: string;
    active: boolean;
};

export interface IAdvertismentState {
    fetching: GlobalOperation;
    create: GlobalOperation;
    list: Advertisment[];
    createdAdvertise: Pick<Advertisment, "_id"> | null;
}
