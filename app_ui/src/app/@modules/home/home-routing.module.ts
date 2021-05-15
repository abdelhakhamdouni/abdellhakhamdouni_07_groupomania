import { PostPageComponent } from './post-page/post-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ListUserPageComponent } from './list-user-page/list-user-page.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'publication/:id', component: PostPageComponent},
  {path:'membres', component: ListUserPageComponent},
  {path:'profile/:id', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }




// const updateUploadsImage = (id) => {

//   const formData = new FormData()
//   formData.append("file", image[0])

//   Axios.put(`http://localhost:3001/upload/update/${id}`, formData)
//       .then((response) => {
//           console.log(response);
//           window.alert('update');
//       })
// }
