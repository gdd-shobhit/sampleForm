import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
   userModle = new User('keshav','',9638527410,'keshav50m');
   constructor(private _enrollmentService: EnrollmentService ){}

  ngOnInit() {

    
  }

  onSubmit(){
    this._enrollmentService.enroll(this.userModle)
    .subscribe(
     
      // res => {
      //   console.log(res)
      //   localStorage.setItem('token', res.token)
      // },
      data => console.log(this.userModle)
    )
  }
}
