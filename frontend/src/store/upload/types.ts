import { GlobalOperation } from "../types";

export type UploadResponse = {
    secure_url: string;
};

export interface IUploadsState {
    upload: GlobalOperation;
}
