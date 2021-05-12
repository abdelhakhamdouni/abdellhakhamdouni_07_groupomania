import { GuardGuard } from './@guard/guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: ()=> import('./@modules/home/home.module').then(m => m.HomeModule), canActivate:[GuardGuard]},
  {path:'auth', loadChildren: ()=> import('./@modules/auth/auth.module').then(m => m.AuthModule)},
  {path:'**', loadChildren: ()=> import('./@modules/home/home.module').then(m => m.HomeModule), canActivate:[GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
