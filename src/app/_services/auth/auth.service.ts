import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  userCredential: any;
  userData: any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }




  loginUser(userCredential)
  {
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.http.post('http://13.59.10.105:8080/campusquo_services/api/users/userLogin', userCredential, {headers: header}).map(res => {return res});
  }



  isAuthenticated(){
    return this.cookie.get( 'sessionId');
  }

}