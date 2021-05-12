import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/@services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;
  
  postId: number;
  constructor(private postService: PostService) { }
  
  ngOnInit(): void {
    this.postId = this.post.id
  }

  toggleMenu(classe: string){
    document.querySelector(`.${classe}`).classList.toggle('show')
  }

  showPost(id){}
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
}
