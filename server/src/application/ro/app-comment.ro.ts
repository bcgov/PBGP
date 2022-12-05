export interface CommentRo {
  userId: string;
  displayName: string;
  commentId: string;
  comment: string;
  createdAt: string;
}

export class CommentResultRo {
  comments: CommentRo[];
  constructor(data: CommentRo[]) {
    this.comments = data;
  }
}
