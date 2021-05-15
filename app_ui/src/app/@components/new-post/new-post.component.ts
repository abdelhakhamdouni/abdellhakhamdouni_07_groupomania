import { Store } from '@ngrx/store';
import { PostService } from './../../@services/post.service';
import { UserApiService } from './../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import User from '../../models/User';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AppState } from 'src/app/AppState';

import * as PostActions from '../../@store/actions/post.actions'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  
  user: User;
  imagepreview = null
  image= null;
  message:string;
  postData ;
  error: string;
  userLogged;
  update: boolean = false
  postId:number
  
  
  constructor(private userService: UserApiService, private postService: PostService, private sanitizer: DomSanitizer, private router: Router, private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.deleteImage()
    this.userService.getUser().subscribe(user=> this.userLogged = user)
    this.closeModal()
    this.postService.dataUpdated.subscribe(post => {
      console.log(post)
      if(post) this.update = true
      this.postgroup.patchValue({
        title: post.title,
        content: post.description
      })
      this.imagepreview = post.image
      this.postId = post.id
    })
  }
  
  postgroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  })

  closeModal(){
    document.querySelector('.modal').classList.toggle('show')
  }

  preview(event) {
    let files = event.target.files;
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    this.image = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imagepreview = reader.result; 
    }
  }
  
  deleteImage(){
    this.image = null
    this.imagepreview = null
  }
  
  savePostForm(event){
    event.stopPropagation() 
    event.preventDefault()

    let description = this.postgroup.controls.content.value
    let title = this.postgroup.controls.title.value

    let formData = new FormData();
    if(this.image) {
      formData.append('image', this.image[0])
    }
    formData.append('post', JSON.stringify({
      title,
      description,
      UserId: this.userLogged.id
    }))

    if(!this.imagepreview && !description){
      this.error = "Un post sans image ni texte, ce n'est plus un post "
      return
    }
    else{
      console.log("save post")
      this.postService.savePost(formData)
      .subscribe(res=> {
        if(res){{
          this.postService.getPost()
          this.deleteImage()
          let description = this.postgroup.controls.content.setValue('')
          let title = this.postgroup.controls.title.setValue('')
          this.closeModal()
        }}
      })
    }
  }

  updatePostForm(event){
    event.stopPropagation() 
    event.preventDefault()

    let description = this.postgroup.controls.content.value
    let title = this.postgroup.controls.title.value

    // this.postData.title = title
    // this.postData['description'] = description
    // this.postData['UserId'] = this.userLogged.id
    // this.postData['pseudo'] = this.userLogged.lastName

    let formData = new FormData();
    if(this.image) {
      formData.append('image', this.image[0])
    }
    formData.append('post', JSON.stringify({
      title,
      description,
      UserId: this.userLogged.id
    }))

    if(!this.imagepreview && !description){
      this.error = "Un post sans image ni texte, ce n'est plus un post "
      return
    }
    else{
      console.log("update post")
      this.postService.updatePost(formData, this.postId)
      .subscribe((posts)=> {
          this.store.dispatch(new PostActions.LoadPosts(posts))
          this.deleteImage()
          this.postgroup.controls.content.setValue('')
          this.postgroup.controls.title.setValue('')
          this.closeModal()
        
      })
    }

  }


}
