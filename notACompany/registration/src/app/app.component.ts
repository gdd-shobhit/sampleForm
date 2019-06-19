import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userModle = new User('keshav','keshav50m@gmail.com',9636336999,'keshav50m');

  constructor(private _enrollmentService: EnrollmentService ){}

  onSubmit(){
    this._enrollmentService.enroll(this.userModle)
    .subscribe(
      data => console.log(this.userModle)
    )
  }
}
