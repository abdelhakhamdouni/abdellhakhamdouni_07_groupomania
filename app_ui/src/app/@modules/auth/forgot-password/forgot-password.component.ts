import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  image: string = "assets/images/img-01.png"
  error:string
  showValider = true

  constructor(private authService: AuthService, private router:Router) { }

  fpassword = new FormGroup({
    email: new FormControl('')
  })

  submit(e){
    e.preventDefault()
    this.error = ''
    const email = this.fpassword.controls.email.value
    this.authService.fpassword({email}).subscribe(data=> {
      console.log(data)
      if(data.err){
        this.error = data.err
      }
      else{
      this.error = `Votre mot de passe a été mis a jour voici le nouveau : ${data.password}`
      this.showValider = false
      }
    })
  }



  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((bool)=>{
      bool && this.router.navigate(['/'])
    })
  }


}
