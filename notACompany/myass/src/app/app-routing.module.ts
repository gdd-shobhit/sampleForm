import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { enrollmentGuard } from './enrollment.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path:'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'login', component: LoginComponent, canActivate: [enrollmentGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [enrollmentGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegistrationComponent, LoginComponent, ProfileComponent];
