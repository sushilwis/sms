import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { Helpers } from "../../helpers";


declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  position: any = "top-right";


  constructor(
    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService,
    private toastyService: ToastyService,
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
    Helpers.setLoading(true);
    var loginData = this.loginForm.value;

    this.authServ.loginUser(loginData).subscribe((res:any) => {

      if(res.success){

        this.cookie.set( 'sessionId', res.data.sessionID );
        this.cookie.set( 'fName', res.data.firstName );
        this.cookie.set( 'uID', res.data.userID );
        this.cookie.set( 'uName', res.data.userName );
        this.cookie.set( 'uRole', res.data.userRole );
        this.cookie.set( 'insID', res.data.institution.id );
        this.router.navigate(['/dashboard']);
        
      } else {

        console.log('login else called : ', res);
        Helpers.setLoading(false);

        this.addToast({
          title: "FAIL!",
          msg: res.response,
          timeout: 6000,
          theme: "default",
          position: "top-right",
          type: "error"
        });
        // this.router.navigate(['/login']);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
  }






  addToast(options): any {
    
    if (options.closeOther) {
      this.toastyService.clearAll();
    }

    this.position = options.position ? options.position : this.position;

    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    // this.toastyService.success(toastOptions);

    switch (options.type) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }




}
