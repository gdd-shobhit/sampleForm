import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
   userModle = new User('','',9636336999,'keshav50m');
   constructor(private _enrollmentService: EnrollmentService,private router : Router ){}

  ngOnInit() {

    
  }

  onSubmit(){
    this._enrollmentService.enroll(this.userModle)
    
    .subscribe(
     
      res => {
      //   console.log(res)
      //   localStorage.setItem('token', res.token)
      // this.router.navigateByUrl('/login');
      },
      data => console.log(this.userModle)
      
    )
    this.router.navigateByUrl('/login');
  }
  
}
