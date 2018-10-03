import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})

export class AppHeader implements OnInit, AfterViewInit {

  userDetails;

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getLoggedUserDetail();
  }

  ngAfterViewInit()  { }
  


  userLogout() {
    this.cookie.delete('sessionId');
    this.router.navigate(['/login']);
  }



  getLoggedUserDetail() {

    this.userDetails =  {
      name : this.cookie.get('fName'),
      uID : this.cookie.get('uID'),
      uName : this.cookie.get('uName'),
      uRole : this.cookie.get('uRole')
    }

    console.log(this.userDetails);
  }




}
