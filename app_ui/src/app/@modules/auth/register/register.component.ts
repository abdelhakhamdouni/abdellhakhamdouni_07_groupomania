import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  image: string = "assets/images/img-01.png"
  avatar: ''
  formData: FormData
  avatar_url:string

  constructor(private authService: AuthService, private router:Router) { }

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })

  chooseImage(event){
    this.avatar = event.target.files[0]
    let name = event.target.files[0].name.slice(0,20)
    this.avatar_url =  name
  }

  submit(){
    this.formData = new FormData()
    const email = this.login.controls.email.value
    const password = this.login.controls.password.value
    const firstName = this.login.controls.firstName.value
    const lastName = this.login.controls.lastName.value

    this.formData.append('image', this.avatar)
    this.formData.append('user', JSON.stringify({email, password, firstName, lastName}))

    this.authService.register(this.formData).subscribe(data=> {
      if(data.succes) this.router.navigate(['/auth/login'])
      else{
        return
      }
    })
  }



  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((bool)=>{
      bool && this.router.navigateByUrl('/')
    })
  }

}
