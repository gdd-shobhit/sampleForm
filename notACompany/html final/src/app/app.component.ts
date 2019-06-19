import { Component } from '@angular/core';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profile:any;
  constructor(private _enrollmentService: EnrollmentService){
    this.profile = JSON.parse(localStorage.getItem('profile'));
    // console.log(this.profile);
  }
}
