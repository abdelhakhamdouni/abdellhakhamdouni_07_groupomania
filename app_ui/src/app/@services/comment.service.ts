import { Observable } from 'rxjs';
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = "http://localhost:8000/api/comments/"


  constructor(protected http: HttpClient, private postService: PostService, private userService: UserApiService,) { }

  saveComment(obj):Observable<any>{
    return this.http.post(this.url,obj)
  }

}
