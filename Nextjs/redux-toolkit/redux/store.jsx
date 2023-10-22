import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/taskSlice";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    tasksReducer,
    userAPI: userApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});

setupListeners(store.dispatch);
