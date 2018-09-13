import { Post } from '../forum/post.model';
import { Comment } from './comment.model';

export class WholePost {
  post: Post;
  comments: Comment[];
}

