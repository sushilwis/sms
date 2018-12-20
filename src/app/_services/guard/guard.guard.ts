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


  // ##################################################################################
  //     ---------------- can activate method for authentication -----------------
  // ##################################################################################
  canActivate(): boolean {
    // if (!this.authServ.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }    
    // return true;
    
    if (this.authServ.isAuthenticated()) {
      console.log('Auth value on can active : ', this.authServ.isAuthenticated());      
      return true;
    } else {
      console.log('Auth value on can active : ', this.authServ.isAuthenticated());
      this.router.navigate(['login']);
      return false;
    }    
  }


  
}
