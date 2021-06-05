import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  image: string = "assets/images/img-01.png"
  error:string
  loading:boolean = false

  constructor(private authService: AuthService, private router:Router) { }

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  submit(e){
    e.preventDefault()
    this.loading = true
    this.error = ''
    const email = this.login.controls.email.value
    const password = this.login.controls.password.value
    this.authService.login(email, password).subscribe(data=> {
      if(data.err){
        this.error = data.err
        this.loading = false
      }
      else{
        sessionStorage.setItem('loged', 'true')
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        window.location.href = '/'
      }
    },
    ()=>{
      this.loading = false
      this.error = "impossible de trouver votre compte, Verifiez votre email et votre mot de passe !"
    })
  }



  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((bool)=>{
      bool && this.router.navigate(['/'])
    })
  }

}
