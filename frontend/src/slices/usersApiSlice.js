import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useLoginMutation } = usersApiSlice;