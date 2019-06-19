import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { EnrollmentService } from './enrollment.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let enrollmentService = this.injector.get(EnrollmentService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${enrollmentService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
