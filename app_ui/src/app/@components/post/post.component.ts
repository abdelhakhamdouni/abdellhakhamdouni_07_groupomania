import { CommentService } from './../../@services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from './../../@services/user-api.service';
import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { PostService } from 'src/app/@services/post.service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;

  postId: number;
  like: number = 0
  user: User
  liked: string
  post_hided: number[]

  constructor(private postService: PostService,
    private elementRef: ElementRef,
    private userService: UserApiService,
    private router: Router,
    private commentService: CommentService) { }

  ngOnInit(): void {

    this.post_hided = localStorage.getItem('post_hided') ? JSON.parse(localStorage.getItem('post_hided')) : []
    this.liked = ""
    this.postId = this.post.id
    this.userService.getUser().subscribe(user => this.user = user)

    if (this.post.Likes.length > 0) {
      this.post.Likes.forEach(element => {
        if (element.UserId == this.user.id) {
          this.like = 1
          this.liked = "liked"
        }
      });
    }
  }

  comment = new FormGroup({
    commentText: new FormControl()
  })

  submitComment(event) {
    event.preventDefault()
    let content = this.comment.controls.commentText.value
    this.commentService.saveComment({
      content,
      UserId: this.user.id,
      PostId: this.post.id,
      CommentId: null
    }).subscribe(
      () => {
        this.postService.getPost()
        window.location.reload()
      }
  )

  }

  toggleMenu(classe: string) {
    document.querySelector(`.${classe}`).classList.toggle('show')
  }

  showPost(id) {
    this.router.navigateByUrl(`/publication/${id}`)
  }
  showEditPostModal(id) { }
  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      (res) => {
        console.log("post_deleteted")
        this.postService.getPost()
        window.location.reload()
      })
  }
  hidePost(id) {
    let _post: HTMLElement = document.querySelector('.post_parent_' + id)
    _post.classList.add('hide')
    this.post_hided.push(id)
    localStorage.setItem('post_hided', JSON.stringify(this.post_hided))
  }
  signalerPost(id) {
    let _post: HTMLElement = document.querySelector('.post_parent_' + id)
    _post.classList.add('signaled')
    _post.classList.add('hide')
    this.post_hided.push(id)
    localStorage.setItem('post_hided', JSON.stringify(this.post_hided))
  }

  likePost(id, like) {
    this.postService.likePost(id, like)
  }
}