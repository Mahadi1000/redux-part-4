import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import {
  useGetCommentByProductIdQuery,
  usePostCommentMutation,
} from '@/redux/features/commentApi';

export default function ProductReview({ productId }: { productId: number }) {
  const [comment, setComment] = useState('');

  const [postComment] = usePostCommentMutation();

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        await postComment({
          productId,
          content: comment,
        });
        setComment('');
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <h1 className="mt-5 text-2xl font-semibold py-5">Review</h1>
      <div className="flex gap-5 items-center">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[30px]"
        />
        <Button
          onClick={handleAddComment}
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </div>
      <ShowComment productId={productId} />
    </div>
  );
}

export const ShowComment = ({ productId }: { productId: number }) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetCommentByProductIdQuery(productId);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError) {
    return <p>Error loading comments.</p>;
  }

  return (
    <div className="mt-10">
      {comments && comments.length > 0 ? (
        comments.map((comment: { content: string }, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://i.ibb.co/BC10fd9/pxfuel-30.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};
