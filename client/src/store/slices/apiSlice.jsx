import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api'}),
    endpoints: (builder)=>({
        loginUser: builder.mutation({
            query: (body)=>({
                url: '/users/login',
                method: 'POST',
                body: body,
                credentials: 'include'
            })
        }),
        registerUser: builder.mutation({
            query: body=>({
                url: '/users',
                method: 'POST',
                body,
                credentials: 'include'
            })
        }),
        getCandidates:builder.query({
            query: ()=>'/users/candidates'
        }),
        registerVote: builder.mutation({
            query: (id)=>({
                url: `/votes/${id}`,
                method: 'POST',
                credentials: 'include'
            })
        }),
        getAllVotes: builder.query({
            query: ()=>'/votes'
        })
    })
    
})


export const {useLoginUserMutation, useRegisterUserMutation, useGetCandidatesQuery, useRegisterVoteMutation, useGetAllVotesQuery} = apiSlice

export default apiSlice