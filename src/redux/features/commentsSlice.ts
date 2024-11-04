import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
    id: number;
    productId: number;
    content: string;
}
interface IComment {
    comments : Comment[];
}

const initialState : IComment = {
    comments : []
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});
export const {addComment, deleteComment} = commentsSlice.actions
export default commentsSlice.reducer;