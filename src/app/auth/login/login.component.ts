import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:FormGroup;
  hidePwdContent:boolean=true;
  constructor(fb:FormBuilder,private apiservice:ApiService,private snackbar:MatSnackBar,private router:Router) {
  this.loginForm=fb.group({
    email:fb.control('',[Validators.required]),
    password:fb.control('',[Validators.required])
  })

  }
  login(){
    debugger
    let user={
      email:this.loginForm.get('email')?.value,
      password:this.loginForm.get('password')?.value
  }
  this.apiservice.login(user).subscribe({
    next:(res)=>{
     if(res=="not found"){
       this.snackbar.open('Credential Invalid','Ok');
     }
     else if(res=='unapproved'){
      this.snackbar.open('Account is Unapproved,Please contact Admin','Ok');
     }else if(res=='blocked'){
      this.snackbar.open('Account Blocked,Please contact Admin','Ok');
     }
     else{
       localStorage.setItem('access_token',res);
       this.apiservice.UserStatus.next("loggedIn");
       this.router.navigateByUrl('/home');
     }
    }
  })
}

}
