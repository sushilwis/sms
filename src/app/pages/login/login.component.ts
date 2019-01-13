import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { Helpers } from "../../helpers";
import { NotificationService } from "../../_services/notification.service";
import { transition, trigger, style, animate } from "@angular/animations";

// this.notification.showNotification(
//   "top",
//   "right",
//   "success",
//   "Success, One Student Found."
// );

// this.notification.showNotification(
//   "top",
//   "right",
//   "warning",
//   "Sorry, Did't Not Found Any Student."
// );

declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.css",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss",
    "../../../../node_modules/ng2-toasty/style-bootstrap.css",
    "../../../../node_modules/ng2-toasty/style-default.css",
    "../../../../node_modules/ng2-toasty/style-material.css"
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
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
    public notification: NotificationService
  ) {}

  ngOnInit() {
    $("body").addClass("empty-layout bg-silver-300");
    this.createFormControls();
    this.createFormGroup();
  }

  ngAfterViewInit() {
    $("#login-form").validate({
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
        $(e)
          .closest(".form-group")
          .addClass("has-error");
      },
      unhighlight: function(e) {
        $(e)
          .closest(".form-group")
          .removeClass("has-error");
      }
    });
  }

  ngOnDestroy() {
    $("body").removeClass("empty-layout bg-silver-300");
  }

  createFormControls() {
    this.userName = new FormControl("", []);
    this.password = new FormControl("", []);
  }

  createFormGroup() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    });
  }

  onLoginSubmit() {
    Helpers.setLoading(true);
    var loginData = this.loginForm.value;

    this.authServ.loginUser(loginData).subscribe((res: any) => {
      if (res.success) {
        console.log("login if called : ", res);
        Helpers.setLoading(false);
        this.cookie.set("sessionId", res.data.sessionID);
        this.cookie.set("fName", res.data.firstName);
        this.cookie.set("uID", res.data.userID);
        this.cookie.set("uName", res.data.userName);
        this.cookie.set("uRole", res.data.userRole);
        this.cookie.set("insID", res.data.institution.id);
        this.router.navigate(["/dashboard"]);

        this.addToast({
          title: "SUCCESS!",
          msg: res.response,
          timeout: 4000,
          theme: "default",
          position: "top-right",
          type: "success"
        });
      } else {
        console.log("login else called : ", res);
        Helpers.setLoading(false);

        this.addToast({
          title: "FAIL!",
          msg: res.response,
          timeout: 4000,
          theme: "default",
          position: "top-right",
          type: "error"
        });
      }
    });
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
