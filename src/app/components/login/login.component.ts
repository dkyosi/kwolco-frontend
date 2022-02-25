import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  userData:any
  isLoggin:any = false
  response: any;


  constructor( private restProvider: RestService,
     public formBuilder: FormBuilder,private router:Router, ) {
      this.loginForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      })
      }

  ngOnInit(): void {
    
  }

  

  userLogin(){

    this.isLoggin = true
    
    this.userData = {
      'username':this.loginForm.value.username,
      'password':this.loginForm.value.password
    }

    this.restProvider.templateLoader('login',this.userData).then(res=>{
      console.log(res)
      this.response = res
      this.restProvider.loginAccessToken = this.response.access_token
      if (this.restProvider.loginAccessToken) {
        this.isLoggin = false;
        localStorage.setItem('STORAGE_KEY_TOKEN', this.response.access_token)
        localStorage.setItem('USER_PROFILE', this.response.user)
        this.restProvider.user_details = this.response.user
        this.router.navigate(['/home'])
      }
    }).catch(err=>{
      console.log(JSON.stringify(err))
      this.isLoggin = false
    })
  }

 

}
