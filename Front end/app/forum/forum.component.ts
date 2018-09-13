import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { ForumService } from './forum.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommentService } from '../forum-post/comment.service';
import { Comment } from '../forum-post/comment.model';
import { ForumPostComponent } from '../forum-post/forum-post.component';
import { ReversePipe } from './reversepipe';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  post: Post;
  allPosts: Post[];
  comments: Comment[];
  numOfPosts: number;

  // tslint:disable-next-line:max-line-length
  constructor(private forumService: ForumService, private router: Router, public dialog: MatDialog, private commentService: CommentService) { }

  ngOnInit() {
    this.numOfPosts = 0;
    this.getPosts();
    this.post = new Post();
  }

    // tslint:disable-next-line:max-line-length
    openDialog(onePost: Post): void {
      this.commentService.getForumComments(onePost.id)
      .subscribe(
        response => {
          this.comments = response;
          const dialogRef = this.dialog.open(ForumPostComponent, {
            width: '75%',
            height: '85%',
            data: {post: onePost, comments: this.comments}
          });

          dialogRef.afterClosed().subscribe(result => {
             console.log('The dialog was closed');
            // this.show = result;
          });
        },
        error => {
          console.log('error');
        }
      );
    }

  hasPosts(): boolean {
    if (this.numOfPosts > 0) {
      return true;
    }
    return false;
  }

  getPosts(): void {
    this.forumService.getForumPosts()
    .subscribe(
      response => {
        console.log('success');
        // get reviews again and maybe scroll down?
        this.allPosts = response;
        this.numOfPosts = this.allPosts.length;
      },
      error => {
        console.log('error');
      }
    );
  }

  disableSubmit(): boolean {
    const user = localStorage.getItem('userData');
    if (this.post.subject && this.post.body) {
        if (user) {
          return false;
        }
        return true;
    }
    return true;
  }

  submitPost(): void {
    this.post.author = localStorage.getItem('userData');
    this.forumService.submitForumPost(this.post)
    .subscribe(
      response => {
        console.log('success');
        this.post.subject = '';
        this.post.body = '';
        this.getPosts();
      },
      error => {
        console.log('error');
      }
    );
  }
}
