import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  // type: string = 'password';
  // isText: boolean = false;
  // eyeIcon:string = "fa-eye-slash"
  public signUpForm!: FormGroup;
  

  signUp! :FormGroup

  /**
   *
   */
  constructor(private fb:FormBuilder,
             private authservice:AuthService,
             private router:Router,
             private toast: NgToastService
             ) {
    
    
  }

  // hideShowPass(){
  //   this.isText = !this.isText;
  //   this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
  //   this.isText ? this.type = 'text' : this.type = 'password'
  // }
  ngOnInit(): void {
    this.signUp = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]

    })
  }

  signUpUser(){
   console.log( this.signUp.value);
   this.authservice.singUp(this.signUp.value).subscribe(
    {
      next:(res)=>{
            this.toast.success({detail:'SUCCESS', summary:res.message, duration:5000});
            this.signUp.reset();
            this.router.navigate(['login']);
      },
      error:(err)=>{
        //alert(err?.error.message)
        this.toast.error({detail:'ERROR', summary:err?.error.message, duration:5000})
      }
    }
   )
  }
}
