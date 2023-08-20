import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/services/User-service/user.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
       templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
               private authService:AuthService,
               private router:Router,
               private toast:NgToastService,
               private userService: UserService
               ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({

        next:(res)=>{
          this.authService.setToken(res.accessToken);
          this.authService.setRefreshToken(res.refreshToken);
          const payloadToken = this.authService.decodedToken();
          this.userService.setFullNameFromTokenStore(payloadToken.name);
          this.userService.setRoleFromTokenStore(payloadToken.role);
          this.toast.success({detail:'SUCCESS', summary:"Login Successful", duration:5000});
          this.loginForm.reset();
          this.router.navigate(['dashboard']);

        },
        error:(err)=>{
          this.toast.error({detail:'ERROR', summary:err?.error.message, duration:5000})
        }
      })
  }

}
