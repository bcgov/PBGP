export interface AppComment {
  userId: string;
  displayName: string;
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
