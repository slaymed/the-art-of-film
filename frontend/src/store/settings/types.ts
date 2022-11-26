import { GlobalOperation, TimeStamp } from "../types";

export interface ISetting extends TimeStamp {
    site_logo: string;
    site_favicon: string;
    site_keywords: string[];
    min_withdraw_amount: number;
    auto_release_orders_time: number;
    commission_percentage_on_sold_posters: number;
    sponsor_price_for_day: number;
    banner_price_for_day: number;
    advertorial_price_for_day: number;
}

export interface ISettingState {
    websiteSettings: ISetting | null;
    fetchingWebsiteSettings: GlobalOperation;
}
