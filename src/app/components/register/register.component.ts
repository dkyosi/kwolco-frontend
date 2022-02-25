import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  userData:any
  isLoggin:any = false

  constructor(private restProvider: RestService,
    public formBuilder: FormBuilder,private router:Router) { 
      this.registerForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required,Validators.email])],
        phone: ['', Validators.compose([Validators.required,Validators.minLength(10)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      })
    }

  ngOnInit(): void {
  }

  registerUser(){
    this.isLoggin = true
    
    this.userData = {
      'username':this.registerForm.value.username,
      'email':this.registerForm.value.email,
      'phone':this.registerForm.value.phone,
      'password':this.registerForm.value.password
    }

    this.restProvider.templateLoader('signup',this.userData).then(res=>{
      console.log(res)
      this.isLoggin = false
    }).catch(err=>{
      console.log(JSON.stringify(err))
      this.isLoggin = false
    })

  }

}
