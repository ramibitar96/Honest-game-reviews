import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { WholePost } from './wholePost.model';
import { Post } from '../forum/post.model';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {

  comment: Comment;
  original: Post;
  comments: Comment[];

  constructor(private commentService: CommentService, public dialogRef: MatDialogRef<ForumPostComponent>,
  @Inject(MAT_DIALOG_DATA) public data: WholePost) {
    this.original = data.post;
    this.comments = data.comments;
    window.focus();
  }

  ngOnInit() {
    this.comment = new Comment();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasComments(): boolean {
    if (!this.comments || this.comments.length === 0) {
      return false;
    }
    return true;
  }

  disableComment() {
    const user = localStorage.getItem('userData');
    if (this.comment.body) {
        if (user) {
          return false;
        }
        return true;
    }
    return true;
  }

  submitComment(): void {
    this.comment.postID = this.original.id;
    this.comment.author = localStorage.getItem('userData');
    this.commentService.submitForumComment(this.comment)
    .subscribe(
      response => {
        this.comment.body = null;
        console.log('success');
        this.getComments();
      },
      error => {
        console.log('error');
      }
    );
  }

  getComments(): void {
    this.commentService.getForumComments(this.original.id)
      .subscribe(
        response => {
          this.comments = response;
        }
      );
  }
}
