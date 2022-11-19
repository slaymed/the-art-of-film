export const mapErrors = (error: any): any | undefined => error?.response?.data || { message: "Something went wrong" };
