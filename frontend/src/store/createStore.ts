import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";

const createStore = () => configureStore({ reducer });

export default createStore;
