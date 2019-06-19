import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnrollmentService } from '../enrollment.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public details = [];

  constructor(private httpClient: HttpClient, private configService: EnrollmentService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() 
  {
    this.configService.getConfig()
      .subscribe((data => this.details = data)
      )};

}
