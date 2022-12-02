export interface AppComment {
  userId: string;
  userName: string;
  commentId: string;
  comment: string;
  createdAt: string;
}

export class AppCommentRo {
  comments: AppComment[];
  constructor(data: AppComment[]) {
    this.comments = data;
  }
}
