import { Router } from '@angular/router';
import { UserApiService } from './../../@services/user-api.service';
import { Component, Input, OnInit } from '@angular/core';
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
  liked:string

  constructor(private postService: PostService, private userService: UserApiService, private router: Router) { }
  
  ngOnInit(): void {
    this.liked = ""
    this.postId = this.post.id
    this.userService.getUser().subscribe(user=> this.user = user)
    if(this.post.Likes.length > 0){
      this.post.Likes.forEach(element => {
        if(element.UserId == this.user.id) {
          this.like = 1
          this.liked = "liked"
        }

      });
    }
    console.log(this.like)
  }

  toggleMenu(classe: string){
    document.querySelector(`.${classe}`).classList.toggle('show')
  }

  showPost(id){
    this.router.navigateByUrl(`/publication/${id}`)
  }
  showEditPostModal(id){}
  deletePost(id){
    this.postService.deletePost(id).subscribe(
      (res)=> {
        console.log("post_deleteted")
        this.postService.getPost()
        window.location.reload()
      })
  }
  hidePost(id){
    let _post:HTMLElement = document.querySelector('.post_parent_'+id)
    console.log(_post)
    _post.classList.add('hide')
  }
  signalerPost(id){}
  
  likePost(id,like){
    this.postService.likePost(id, like)
  }
  
  
}