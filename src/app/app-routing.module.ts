import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
