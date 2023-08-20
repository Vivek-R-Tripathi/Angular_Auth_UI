import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/User-service/user.service';
import { ApiService } from 'src/services/api-service/api.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users:any;

  fullName:string ="";
  role :string ="";

  /**
   *
   */
  constructor(private auth:AuthService,
              private route:Router,
              private apiService : ApiService,
              private userService:UserService 
              ) {
  
  }
  ngOnInit() {
    this.apiService.getAllUser().subscribe((userResponse)=>{
      this.users = userResponse;
      console.log(this.users);
    });
     this.userService.getFullNameFromTokenStore().subscribe((res)=>
     {
      let fullName = this.auth.userPayLoad.name;
      this.fullName = res || fullName;
     });
     this.userService.getRoleNameFromTokenStore().subscribe((res)=>{
      let role = this.auth.userPayLoad.role;
      this.role = res || role;
     })


  }

  logOut()
  {
    this.auth.logOut();
    this.route.navigate(['login']);
  }

}
