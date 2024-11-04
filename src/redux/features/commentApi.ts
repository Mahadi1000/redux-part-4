import { api } from "../api/apiSlice";
import { Comment } from "./commentsSlice";


const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/comment',
    }),
    getCommentByProductId: builder.query({
      query: (productId) => ( `/comment/${productId}` ),
    }),
    postComment: builder.mutation<Comment, Partial<Comment>>({
      query: (newComment) => ({
        url: `/comment`,
        method: 'POST',
        body: newComment,
      }),
    }),
  }),
});

export const {useGetCommentByProductIdQuery, useGetCommentsQuery, usePostCommentMutation} = commentApi