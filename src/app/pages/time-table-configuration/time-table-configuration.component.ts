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
import { Helpers } from "../../helpers";

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
  timeTableSearchForm: FormGroup;
  academic: FormControl;
  class: FormControl;
  section: FormControl;
  startTime: FormControl;
  periodDuration: FormControl;
  noOfDays: FormControl;
  period: FormControl;

  searchAcademic: FormControl;


  showTimeTable: boolean = false;
  totalPeriod: string;
  periodArr: any = [];
  totalDays: string;
  daysArr: any = [];
  subjects: any = [];
  teachers: any = [];
  filterTeacherarr: any = {};
  subject: any = {};
  teacher: any = {};
  currentSubjectId: any;
  routineData: any = [];
  classListForSearch: any;
  sectionListForSearch: any;
  showTimeTableForClass: boolean = false;
  timeTableDataForClassSection: any = [];

  days: any = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService,
    private toastyService: ToastyService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.authServ.getLogedInUserData();
    this.createFormGroup();
    this.createFormGroupForSearch();
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

  createFormGroupForSearch() {
    this.timeTableSearchForm = new FormGroup({
      searchAcademic: new FormControl("", [Validators.required]),
      searchClass: new FormControl("", [Validators.required]),
      searchSection: new FormControl("", [Validators.required]),
      // startTime: new FormControl("", [Validators.required]),
      // periodDuration: new FormControl("", [Validators.required]),
      // noOfDays: new FormControl("", [Validators.required]),
      // period: new FormControl("", [Validators.required]),
    });
  }




  institutionSelectDetails () {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      institutionID : this.cookie.get("insID"),
    };

    this.http.post(`${environment.apiUrl}institution/getInsSpecificSelectDetails`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        // console.log('select data : ...', data);

        if(data && data.success){
          this.academicList = data.academicList;
          this.classList = data.classList;
          this.classListForSearch = data.classList; 
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
    // console.log(e.value);
    let selectedClass = this.classList.filter((ele)=>{
      return ele.classID == e.value;
    });

    // console.log();   
    this.sectionList = selectedClass[0].sectionDetails;
    this.sectionListForSearch = selectedClass[0].sectionDetails;
  }






  onSubmitTimeTable() {
    this.showTimeTable = true;
    // console.log('time table submit called');
    // console.log('value', this.timeTableAddForm.value);
    
    this.totalPeriod = this.timeTableAddForm.value.period;
    this.totalDays = this.timeTableAddForm.value.noOfDays;
    this.periodArr = [];
    this.daysArr = [];
    // let days = [
    //   'monday',
    //   'tuesday',
    //   'wednesday',
    //   'thursday',
    //   'friday',
    //   'saturday'
    // ];

    for(let i=1; i<=parseInt(this.totalPeriod); i++){
      let obj = {
        id: i,        
      }
      this.periodArr.push(obj);
    } 

    for(let i=1; i<=parseInt(this.totalDays); i++){
      let obj = {
        id: i,
        day: this.days[i-1],        
      }
      this.daysArr.push(obj);
    }


    this.getSubjectListForClass(this.timeTableAddForm.value.class);
    this.getTeacherListForClassSection(this.timeTableAddForm.value.class, this.timeTableAddForm.value.section);
    // console.log('period arr : ', this.periodArr);
  }







  onSubmitSearchTimeTable() {
    // console.log('submit pressed...', this.timeTableSearchForm.value); 
    Helpers.setLoading(true);
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      day: 0,
	    dayFilter: false,
	    academicID: this.timeTableSearchForm.value.searchAcademic,
	    classID: this.timeTableSearchForm.value.searchClass,
	    sectionID: this.timeTableSearchForm.value.searchSection,
    };


    // console.log('sent data for add routine : ...', postData);
    
    this.http.post(`${environment.apiUrl}admin/getTimeTableDetailsForClass`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        Helpers.setLoading(false);

        console.log('time table data : ...', data);

        if(data && data.success){
          
          this.addToast({
            title: "SUCCESS!",
            msg: data.response,
            timeout: 5000,
            theme: "default",
            position: "top-right",
            type: "success"
          });

          this.timeTableDataForClassSection = data.data;

          this.timeTableDataForClassSection.forEach((data, i) => {
            data.dayName = this.days[i];
          });

          this.showTimeTableForClass = true;

        }else{

          this.addToast({
            title: "FAIL!",
            msg: data.response,
            timeout: 5000,
            theme: "default",
            position: "top-right",
            type: "error"
          });

        }       
    });   
  }







  getSubjectListForClass(classId) {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      "classID": classId,
    };

    this.http.post(`${environment.apiUrl}admin/getAssociatedSubjectsForClass`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        // console.log('subject list data : ...', data);
        this.setPeriodTimeValues(this.timeTableAddForm.value.startTime);
        if(data && data.success){
          this.subjects = data.data;
        }
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
        // console.log('teacher list data : ...', data); 

        if(data && data.success){
          this.teachers = data.data;
        }        
    });
  }




  
  setPeriodTimeValues(time){
    // console.log(time);
    let startTime = time;
    this.periodArr.forEach(element => {
      let inputEleFrom = <HTMLInputElement>document.querySelector('#from_'+element.id);
      let inputEleTo = <HTMLInputElement>document.querySelector('#to_'+element.id);
      inputEleFrom.value = startTime;
      startTime = this.addTwoTimes(startTime, this.timeTableAddForm.value.periodDuration);
      inputEleTo.value = startTime;
      // console.log(startTime);      
    });
  }





  addTwoTimes(time: any, diff: any){
    // console.log(time, diff);    
    let hoursMinArrForTime = time.toString().split(':');
    let hoursMinArrForDiff = diff.toString().split(':');
    let increasedMin = parseInt(hoursMinArrForTime[1])+parseInt(hoursMinArrForDiff[1]);
    if(increasedMin > 59){
      let newHours = parseInt(hoursMinArrForTime[0])+1;
      let newMin = increasedMin - 60;
      if(newMin == 0){
        var newMinInZero = '00';
        return `${newHours}:${newMinInZero}`;
      }else{
        return `${newHours}:${newMin}`;
      }
      
    }else{
      let newHours = hoursMinArrForTime[0];
      let newMin = increasedMin;
      return `${newHours}:${newMin}`;
    }
  }






  onSelectSubject(e, id) {
    // console.log('subject value : ', e.value, id); 
    this.currentSubjectId = e.value;
    let arr = [];

    this.teachers.forEach((element)=>{     
      element.subjectList.forEach(ele => {
        // console.log(ele);
        if (ele.subjectID == e.value) {
          arr.push(element);
        }        
      });
    });

    this.filterTeacherarr[id] = arr; 
    // console.log(this.filterTeacherarr); 

  }





  onSelectTeacher(e, dayName, day, period) {
    // console.log(e.value, dayName, day, period);
    // let inputEleTeacher = <HTMLInputElement>document.querySelector('#'+id);
    // inputEleTeacher.value = e.value;
    // inputEleTeacher.disabled = true; 
    day = day+1;
    let subjectInputID = `subject_${dayName}_${period}`;
    // console.log('#'+ subjectInputID);     
    // let subID = <HTMLSelectElement>document.querySelector('#'+ subjectInputID);
    // let subID = <HTMLSelectElement>document.getElementById(subjectInputID);
    // console.log('input value :....', subID);    
    let from = <HTMLInputElement>document.querySelector('#from_'+ period);
    let to = <HTMLInputElement>document.querySelector('#to_'+ period);

    var obj = {
      day : day,
      teacherID : e.value,
      subjectID : this.subject[`${dayName}${period}`],
      fromTime : from.value,
      toTime : to.value,
    }

    let isDataPresent = this.routineData.filter(data => {
      return data.day == day && data.fromTime == from.value;
    });

    // console.log(isDataPresent.length);
    // console.log('match item',isDataPresent.length);
    
    if(isDataPresent.length > 0) {
      // console.log('data present...'); 
      let index = this.routineData.indexOf(isDataPresent[0]);
      this.routineData.splice(index, 1, obj);
      // console.log('ROUTINE DATA....: ',this.routineData);     
    }else{
      // console.log('data is not present...');
      this.routineData.push(obj);
      // console.log('ROUTINE DATA....: ',this.routineData);
    }

    // console.log('ng model teacher :...', this.teacher);
    // console.log('ng model subject :...', this.subject);       
  }







  onSubmitRoutine(){
    Helpers.setLoading(true);
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");
    
    let postData = {
      data: this.routineData,
      classID : this.timeTableAddForm.value.class,
      sectionID : this.timeTableAddForm.value.section,
      institutionID : this.cookie.get("insID"),
      createdBy : this.cookie.get("uID"),
      academicID : this.timeTableAddForm.value.academic,
    };


    // console.log('sent data for add routine : ...', postData);
    
    this.http.post(`${environment.apiUrl}admin/addClassTimeTable`, postData, { headers: header }).map(res => { return res; }).subscribe((data: any) => {
        Helpers.setLoading(false);
        console.log('teacher list data : ...', data); 

        if(data && data.success){
          
          this.addToast({
            title: "SUCCESS!",
            msg: data.response,
            timeout: 5000,
            theme: "default",
            position: "top-right",
            type: "success"
          });

          this.timeTableAddForm.reset();
          this.subject = {};
          this.teacher = {};
          this.showTimeTable = false;

        }else{

          this.addToast({
            title: "FAIL!",
            msg: data.response,
            timeout: 5000,
            theme: "default",
            position: "top-right",
            type: "error"
          });

        }       
    });
  }



}
