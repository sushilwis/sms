import { Component, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements AfterViewInit {

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

  ngAfterViewInit()  { }
  


  userLogout() {
    this.cookie.delete('sessionId');
    this.router.navigate(['/login']);
  }

}
