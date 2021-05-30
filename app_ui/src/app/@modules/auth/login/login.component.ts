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

  constructor(private authService: AuthService, private router:Router) { }

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  submit(e){
    e.preventDefault()
    this.error = ''
    const email = this.login.controls.email.value
    const password = this.login.controls.password.value
    this.authService.login(email, password).subscribe(data=> {
      if(data.err){
        this.error = data.err
      }
      else{
        sessionStorage.setItem('loged', 'true')
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        window.location.href = '/'
      }
    })
  }



  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((bool)=>{
      bool && this.router.navigate(['/'])
    })
  }

}
