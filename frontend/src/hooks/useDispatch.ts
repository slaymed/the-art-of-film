import { useDispatch as dispatchHook } from "react-redux";

import { AppDispatch } from "../store/types";

export const useDispatch = () => dispatchHook<AppDispatch>();
