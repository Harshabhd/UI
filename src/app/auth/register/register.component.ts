import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePwdContent:boolean=true;
  registerForm:FormGroup;
  constructor(private fb:FormBuilder,private apiservice:ApiService,private snackbar:MatSnackBar,private router:Router) {
    this.registerForm=fb.group({
     firstName:fb.control('',[Validators.required]),
     lastName:fb.control('',[Validators.required]),
     email:fb.control('',[Validators.required]),
     mobile:fb.control('',[Validators.required]),
     password:fb.control('',[Validators.required]),
     confirmPassword:fb.control('',[Validators.required])

    });

  }
  register(){
    debugger
    let user={
      firstName:this.registerForm.get('firstName')?.value,
      lastName:this.registerForm.get('lastName')?.value,
      email:this.registerForm.get('email')?.value,
      mobileNumber:this.registerForm.get('mobile')?.value,
      password:this.registerForm.get('password')?.value,
      confirmPassword:this.registerForm.get('confirmPassword')?.value,
    };
    this.apiservice.register(user).subscribe({
      next:(res)=>{
        this.snackbar.open(res,'Ok');
        this.router.navigateByUrl('login');
        
      },
    });
  }
}
