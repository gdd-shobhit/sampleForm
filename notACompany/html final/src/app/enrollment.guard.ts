import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EnrollmentService } from './enrollment.service';


@Injectable({
  providedIn: 'root'
})
export class enrollmentGuard implements CanActivate {
 
  constructor(private _enrollmentService:EnrollmentService,
              private _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(!this._enrollmentService.loggedIn()){
      this._router.navigateByUrl('/registration');
      this._enrollmentService.deleteToken();  
      return false;
    }
    return true;
  }
  }
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
// }
