import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/components/login/login.component';
import { SignUpComponent } from 'src/components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup'
import { TokenInterceptor } from './Interceptors/token.interceptor';
@NgModule({
  declarations: [
    AppComponent, LoginComponent, SignUpComponent, DashboardComponent
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  //exports:[NgToastModule]
})
export class AppModule { }
