import dayjs from "dayjs";

export const formatTimeStamp = (time: number, format: string) => dayjs(time * 1000).format(format);
