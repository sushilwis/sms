import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GuardGuard implements CanActivate {

  constructor(public authServ: AuthService, public router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }



  canActivate(): boolean {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
