import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
// import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GuardGuard implements CanActivate {

  canAct: boolean;

  constructor(public authServ: AuthService, public router: Router, private cookie: CookieService) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  


  // ##################################################################################
  //     ---------------- can activate method for authentication -----------------
  // ##################################################################################
  canActivate(): boolean {

    let is_cookie_set = this.cookie.check('sessionId');    
    // this.authServ.isAuthenticated().then((data)=>{
    //   console.log('Promise : ', data);     
    //   this.canAct = data; 
    //   // return data;    
    // }).catch((err)=>{
    //   console.log(err);
    //   this.canAct = false;      
    // }); 

    // console.log('guard value : ', is_cookie_set);
    // return this.canAct;

    if (is_cookie_set) { 
      console.log('guard value : ', is_cookie_set);     
      return true;
    } else {
      console.log('guard value : ', is_cookie_set);
      this.router.navigate(['login']);
      return false;
    } 
  }


  
}
