import { FormGroup, FormControl } from '@angular/forms';
import { CommentService } from './../../@services/comment.service';
import { PostService } from 'src/app/@services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/User';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment
  @Input() user:User
  @Input() post

  child: string

  constructor(private commentService: CommentService, private postService: PostService) { }

  ngOnInit(): void {
    this.comment.CommentId != this.comment.id ? this.child = "child" : this.child = ""
  }

  toggleMenu(classe: string) {
    document.querySelector(`.${classe}`).classList.toggle('show')
  }
  _comment_child = new FormGroup({
    commentText: new FormControl('')
  })

  submitComment(event) {
    event.preventDefault()
    let content = this._comment_child.controls.commentText.value
    this.commentService.saveComment({
      content,
      UserId: this.user.id,
      PostId: this.post.id,
      CommentId: this.comment.id
    }).subscribe(() => {
        let input:HTMLElement = document.querySelector('#post_'+this.post.id)
        input.nodeValue = ''
        this.postService.getOnePostById(this.post.id)
        this.postService.getLastPosts()
      }
    )
  }

  deleteComment(id){
    this.commentService.deleteComment(id).subscribe(res=>{
      let comment = document.querySelector(`#comment_${this.comment.id}`) as HTMLElement
      comment.style.display = "none"
      this.postService.getOnePostById(this.post.id)
      this._comment_child.controls.commentText.setValue('')
      this.postService.getLastPosts()

    })
  }
  signalerComment(id?:number){
    alert("Nous allons examiner le commentaire de " + this.user.firstName + " " + this.user.lastName +", Merci pour votre vigilance !")
  }

}
