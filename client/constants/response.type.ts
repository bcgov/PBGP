export type CommentType = {
  userId: string;
  displayName: string;
  commentId: string;
  comment: string;
  createdAt: string;
};

export type CommentResponseType = {
  comments: CommentType[];
};
