import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PostComponent } from './../../@components/post/post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from 'src/app/@components/profile/profile.component';
import { MdatePipe } from 'src/app/@pipes/mdate.pipe';
import { PostPageComponent } from './post-page/post-page.component';
import { CommentComponent } from 'src/app/@components/comment/comment.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    MdatePipe,
    PostComponent,
    PostPageComponent,
    CommentComponent,
    ProfilePageComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule

  ],
  exports:[
    ProfileComponent,
    MdatePipe
  ]
})
export class HomeModule { }
