import { Store } from '@ngrx/store';
import { CommentService } from './../../@services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from './../../@services/user-api.service';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { PostService } from 'src/app/@services/post.service';
import User from 'src/app/models/User';
import { AppState } from 'src/app/AppState';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Input() onepost

  postId: number;
  like: number = 0
  liked: string
  likes: number
  user: User
  commented: string
  post_hided: number[]
  modal: HTMLElement = document.querySelector('.modal')
  menuClasse;

  constructor(private postService: PostService,
    private elementRef: ElementRef,
    private userService: UserApiService,
    private router: Router,
    private store: Store<AppState>,
    private commentService: CommentService) { }

  ngOnInit(): void {

    this.post_hided = localStorage.getItem('post_hided') ? JSON.parse(localStorage.getItem('post_hided')) : []
    this.liked = ""
    this.commented = ""
    this.postId = this.post.id
    this.userService.getUser().subscribe(user => this.user = user)
    if (this.post.Comments.length > 0) this.commented = "commented"
    this.likes = this.post.Likes.length
    if (this.likes > 0) {
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
      CommentId: 0
    }).subscribe(
      () => {
       this.comment.controls.commentText.setValue('')
        console.log("comment post")
        if(this.onepost){
          this.postService.getOnePostById(this.post.id)
        }
        else{
          this.postService.getPost()
        }
      }
    )
  }

  toggleMenu(classe: string) {
    this.menuClasse = classe
    document.querySelector(`.${classe}`).classList.toggle('show')
  }

  showPost(id) {
    if(this.onepost) {
      window.open(this.post.image, '_blank', )
    }
    else this.router.navigateByUrl(`/publication/${id}`)
  }
  showEditPostModal(id) {
      this.postService.setPostIdToEdit(this.post)
      this.modal.classList.add('show')
      this.toggleMenu(this.menuClasse)
   }
  deletePost(id) {
    this.postService.deletePost(id).subscribe(
      (res) => {
        if(this.onepost) this.router.navigateByUrl('/')
        this.postService.getPost()
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

  commentThisPost(id) {
    let input: HTMLElement = document.querySelector('#post_' + this.post.id)
    input.focus()
  }

  likePost(id, like) {
    this.postService.likePost(id, like)
    this.postService.getLastPosts()
    if (like === 0) {
      this.likes++
      this.liked = 'liked'
      this.like = 1
    } else {
      this.likes--
      this.liked = ''
      this.like = 0
    }

  }
}