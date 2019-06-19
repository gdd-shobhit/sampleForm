import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { enrollmentGuard } from './enrollment.guard';
import { TokenInterceptorService } from './token-interceptor.service';

import { ProfileComponent } from './profile/profile.component';
import { PasschangeComponent } from './passchange/passchange.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent,
    PasschangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule
  ],
  providers: [enrollmentGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
