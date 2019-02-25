import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { environment } from "./../../../environments/environment";
import { transition, trigger, style, animate } from "@angular/animations";


@Component({
  selector: 'app-user-access-control',
  templateUrl: './user-access-control.component.html',
  styleUrls: [
    './user-access-control.component.scss',
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
export class UserAccessControlComponent implements OnInit {
  usersList: any;
  position: any;
  featureList: any;
  filterFeature: any = [];

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService,
    private toastyService: ToastyService,
    public http: HttpClient
    ) { 
      this.getUserList();
      this.getAllFeatureList();
    }

  ngOnInit() {
    // this.getUserList();
  }





  getUserList() {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let userData = {
      institutionID: this.cookie.get("insID"),
      userID:0,
    };

    this.http.post(`${environment.apiUrl}admin/getUserDetailsForIns`, userData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        // console.log('user list data : ...', data.data);
        if(data && data.success){
          this.usersList = data.data;
        }else{
          this.addToast({
            title: "FAIL!",
            msg: data.response,
            timeout: 4000,
            theme: "default",
            position: "top-right",
            type: "error"
          });

          this.usersList = [];
        }
    });
  }







  getAllFeatureList () {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let userData = {};

    this.http.post(`${environment.apiUrl}masters/getFeaturesList`, userData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        console.log('feature list : ...', data);
        if(data && data.success){
          this.featureList = data.data;
          this.featureList.forEach(ele => {
            ele.subFeatures.forEach(e => {
              e.is_checked = false;
            });
          });
          console.log('Added is checked feature list : ...', this.featureList);
        } else {
          this.addToast({
            title: "FAIL!",
            msg: data.response,
            timeout: 4000,
            theme: "default",
            position: "top-right",
            type: "error"
          });

          this.usersList = [];
        }
    });
  }







  selectFeatureHeader(e,p,h) {
    console.log(e);
    console.log(e.checked); 
    console.log(p); 
    console.log(h);
    
    if(e.checked && p == 'parent'){
      this.filterFeature = this.featureList.filter(ele => {
        return ele.featureHeader == h;
      });

      console.log(this.filterFeature[0].subFeatures);
      if(this.filterFeature[0] && this.filterFeature[0].subFeatures.length > 0){
        this.filterFeature[0].subFeatures.forEach(element => {
          element.is_checked = true;
        });
      }            
    }else{
      this.filterFeature = this.featureList.filter(ele => {
        return ele.featureHeader == h;
      });

      console.log(this.filterFeature[0].subFeatures);
      if(this.filterFeature[0] && this.filterFeature[0].subFeatures.length > 0){
        this.filterFeature[0].subFeatures.forEach(element => {
          element.is_checked = false;
        });
      }            
    }
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
