import { Component, OnInit } from '@angular/core';
import { Change } from '../change';
import { OTP } from '../otp';
import { EnrollmentService } from '../enrollment.service';
import { Router } from '@angular/router';
import { Changep } from '../changep';
@Component({
  selector: 'app-passchange',
  templateUrl: './passchange.component.html',
  styleUrls: ['./passchange.component.css']
})
export class PasschangeComponent implements OnInit {
  userpass = new Change('');
  userOTP = new OTP(null,'');
  userchange = new Changep('','');

  isClicked : boolean = true;
  seClicked : boolean = true;
  thClicked : boolean = true;
  constructor(private _enrollmentService: EnrollmentService,private router : Router ){}


  ngOnInit() {
  }

  toggleClick(){
    this.isClicked = !this.isClicked;
  }

  secondClick(){
    this.seClicked = !this.seClicked;
  }

  thirdClick(){
    this.thClicked = !this.thClicked;
  }

  onSubmit(){
    this._enrollmentService.newpass(this.userpass).subscribe(data =>
       console.log(this.userpass, data)
      
    )
    
    // this.router.navigateByUrl('/login');
  }
  
  ngOTPsub(){
    
    var obj = {
      'email' : this.userpass.email,
      'OTP' : this.userOTP.OTP
    }
    this._enrollmentService.newOTP(obj)
    
    .subscribe(
     
      data => console.log(data)
      
    )
  }

  ngPassSub(){
    var obj1 = {
      'email' : this.userpass.email,
      'password' : this.userchange.password
    }
    this._enrollmentService.finalChange(obj1)
    
    .subscribe(
     
      data => console.log(data)
      
    )
  }
  }



