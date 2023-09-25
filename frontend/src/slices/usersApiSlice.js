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
        register: builder.mutation({    //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (data) => ({
                url: USERS_URL,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (data) => ({
                url: USERS_URL,
            }),
            providesTags: ['User'], //Users
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
        getUserDetails: builder.query({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({   //mutation kada saljemo neke podatke, npr POST zahtev, a query kada imamo obican GET
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation  } = usersApiSlice;