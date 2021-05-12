import { ProfileComponent } from 'src/app/@components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'profile/:id', component: ProfileComponent}
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
