import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';


declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})



export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;


  constructor(
    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService
  ) { }


  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-300');
    this.createFormControls();
    this.createFormGroup();
  }


  ngAfterViewInit() {
    $('#login-form').validate({
        errorClass: "help-block",
        rules: {
            userName: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        highlight: function(e) {
            $(e).closest(".form-group").addClass("has-error")
        },
        unhighlight: function(e) {
            $(e).closest(".form-group").removeClass("has-error")
        },
    });
  }



  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }




  createFormControls() { 
    this.userName = new FormControl('', []);
    this.password = new FormControl('', []);
  }




  createFormGroup() { 
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    });
  }




  onLoginSubmit ()
  {
    var loginData = this.loginForm.value;

    console.log(loginData);
    this.authServ.loginUser(loginData).subscribe((res:any) => {
      if(res.success){
        console.log(res.data);
        this.cookie.set( 'sessionId', res.data.sessionID );
        this.cookie.set( 'fName', res.data.firstName );
        this.cookie.set( 'uID', res.data.userID );
        this.cookie.set( 'uName', res.data.userName );
        this.cookie.set( 'uRole', res.data.userRole );
        this.router.navigate(['/dashboard']);
      }else{
        console.log("Unsuccessfull");
        this.router.navigate(['/login']);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
  }




}
