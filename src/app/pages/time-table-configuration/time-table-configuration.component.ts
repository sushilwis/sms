import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { transition, trigger, style, animate } from "@angular/animations";
import { getLocaleDayNames } from '@angular/common';

@Component({
  selector: 'app-time-table-configuration',
  templateUrl: './time-table-configuration.component.html',
  styleUrls: [
    './time-table-configuration.component.scss',
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

export class TimeTableConfigurationComponent implements OnInit {
  position: any;
  academicList: any;
  classList: any;
  sectionList: any;

  timeTableAddForm: FormGroup;
  academic: FormControl;
  class: FormControl;
  section: FormControl;
  startTime: FormControl;
  periodDuration: FormControl;
  noOfDays: FormControl;
  period: FormControl;


  showTimeTable: boolean = false;
  totalPeriod: string;
  periodArr: any = [];
  totalDays: string;
  daysArr: any = [];

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService,
    private toastyService: ToastyService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.createFormGroup();
    this.institutionSelectDetails();
  }




  createFormGroup() {
    this.timeTableAddForm = new FormGroup({
      academic: new FormControl("", [Validators.required]),
      class: new FormControl("", [Validators.required]),
      section: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
      periodDuration: new FormControl("", [Validators.required]),
      noOfDays: new FormControl("", [Validators.required]),
      period: new FormControl("", [Validators.required]),
    });
  }




  institutionSelectDetails () {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      institutionID : this.cookie.get("insID"),
    };

    this.http.post(`${environment.apiUrl}institution/getInsSpecificSelectDetails`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        console.log('select data : ...', data);

        if(data && data.success){
          this.academicList = data.academicList;
          this.classList = data.classList;
        }
        
        // if(data && data.success){
        //   this.featureList = data.data;
        //   this.featureList.forEach(ele => {
        //     ele.subFeatures.forEach(e => {
        //       e.is_checked = false;
        //     });
        //   });
        //   console.log('Added is checked feature list : ...', this.featureList);
        // } else {
        //   this.addToast({
        //     title: "FAIL!",
        //     msg: data.response,
        //     timeout: 4000,
        //     theme: "default",
        //     position: "top-right",
        //     type: "error"
        //   });

        //   this.usersList = [];
        // }
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





  onChangeClass(e) {
    console.log(e.value);
    let selectedClass = this.classList.filter((ele)=>{
      return ele.classID == e.value;
    });

    console.log();   
    this.sectionList = selectedClass[0].sectionDetails;
  }






  onSubmitTimeTable() {
    console.log('time table submit called');
    console.log('value', this.timeTableAddForm.value);
    this.showTimeTable = true;
    this.totalPeriod = this.timeTableAddForm.value.period;
    this.totalDays = this.timeTableAddForm.value.noOfDays;
    this.periodArr = [];
    this.daysArr = [];
    let days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    for(let i=1; i<=parseInt(this.totalPeriod); i++){
      let obj = {
        id: i,        
      }
      this.periodArr.push(obj);
    } 

    for(let i=1; i<=parseInt(this.totalDays); i++){
      let obj = {
        id: i,
        day: days[i-1],        
      }
      this.daysArr.push(obj);
    }

    this.getSubjectListForClass(this.timeTableAddForm.value.class);
    this.getTeacherListForClassSection(this.timeTableAddForm.value.class, this.timeTableAddForm.value.section);
    // console.log('period arr : ', this.periodArr);
  }







  getSubjectListForClass(classId) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      "classID": classId,
    };

    this.http.post(`${environment.apiUrl}admin/getAssociatedSubjectsForClass`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        console.log('subject list data : ...', data);

        // if(data && data.success){
        //   this.academicList = data.academicList;
        //   this.classList = data.classList;
        // }
    });
  }







  getTeacherListForClassSection(classId, secId) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      classID: classId,
      sectionID: secId
    };

    this.http.post(`${environment.apiUrl}users/getAssociatedTeacherForClassSec`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        console.log('teacher list data : ...', data);

        // if(data && data.success){
        //   this.academicList = data.academicList;
        //   this.classList = data.classList;
        // }
    });
  }




  
  printValue(value: any){
    console.log(value);
    var containputiner = document.querySelector("#"+value);
    console.log(containputiner);
  }



}
