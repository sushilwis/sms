import { environment } from "./../../../../environments/environment";
// import { transition, trigger, style, animate } from "@angular/animations";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
// import { DatatableComponent } from "@swimlane/ngx-datatable";
import { transition, trigger, style, animate } from "@angular/animations";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import swal from "sweetalert2";
// import { CookieService } from "ngx-cookie-service";
import {Helpers} from "../../../helpers";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
// import { Helpers } from "../../../helpers";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: [
    "./student-list.component.css",
    "../../../../../node_modules/sweetalert2/src/sweetalert2.scss",
    "../../../../../node_modules/ng2-toasty/style-bootstrap.css",
    "../../../../../node_modules/ng2-toasty/style-default.css",
    "../../../../../node_modules/ng2-toasty/style-material.css"
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


export class StudentListComponent implements OnInit {
  position: any = "top-right";
  temp = [];
  rowsFilter = [];
  public data: any;
  // public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  allStd: any;
  // position: any;
  stdDetailsData: any;
  url: string = '';
  stdId: any;
  showMoreBtnText: any;
  showDetailsPart: boolean;
  showStudentDetailsSection: boolean;
  classData: any = [];
  // public data: any;
  // public sortOrder = 'desc';
  rows = [
    // {roll: "1", name: "Mehur", gender: "Male"},
    // {roll: "1", name: "Mehur", gender: "Male"},
    // {roll: "1", name: "Mehur", gender: "Male"}
  ];

  // @ViewChild(DatatableComponent)
  // table: DatatableComponent;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService,
    private toastyService: ToastyService,
    private http: HttpClient,
    // private cookie: CookieService
  ) {

    this.fetch(data => {
      this.allStd = data.data;
      // console.log(this.allStd);
      if(this.allStd){
        setTimeout(()=>{
          Helpers.setLoading(false);
        }, 1000);
      } 

      var shortStdArr = [];
      this.allStd.forEach(std => {
        let stdInfo = {
          admissionNo: std.admissionNo,
          photo: std.studentProfPicPath,
          name: std.firstName,
          gender: std.gender,
          parentsName: std.fatherFName,
          class: std.className,
          section: std.sectionName,
          address: std.profileDetails.permanentAddress1,
          dateOfBirth: std.date_of_birth,
          mobileNo: std.mobileNo,
          email: std.fatherEmailID,
          Id: std.studentID
        };

        shortStdArr.push(stdInfo);
      });

      this.rows = shortStdArr;
      // console.log(this.rows);
    });
  }

  ngOnInit() {
    Helpers.setLoading(true);
    this.url = './assets/img/pro-pic-placeholder.jpg';
    this.showMoreBtnText = "Show More";
    this.showDetailsPart = false;
    this.showStudentDetailsSection = false;
    this.insSelectDetails();
    // Helpers.setLoading(true);
    // let regStdDetail = localStorage.getItem('regStd');
    // this.getStudentDetailsForFilters();
  }

  ngAfterViewInit() {
        
    // let regStdDetail = localStorage.getItem('regStd');
    // this.getStudentDetailsForFilters();
    // $("#example-table").DataTable({
    //   data: this.rows,
    //   columns: [
    //     { data: 'roll' },
    //     { data: 'photo' },
    //     { data: 'name' },
    //     { data: 'gender' },
    //     { data: 'parentsName' },
    //     { data: 'class' },
    //     { data: 'section' },
    //     { data: 'address' },
    //     { data: 'dateOfBirth' },
    //     { data: 'mobileNo' },
    //     { data: 'email' },
    //     { data: 'actions' }
    // ],
    //   pageLength: 15,
    //   ordering: true,
    //   searching: false,
    //   lengthChange: false
    // });
  }
  // ngAfterViewInit() {
  //   // let regStdDetail = localStorage.getItem('regStd');
  //   // this.getStudentDetailsForFilters();
  //   $("#example-table").DataTable({
  //     data: this.rows,
  //     columns: [
  //       { data: "roll" },
  //       { data: "photo" },
  //       { data: "name" },
  //       { data: "gender" },
  //       { data: "parentsName" },
  //       { data: "class" },
  //       { data: "section" },
  //       { data: "address" },
  //       { data: "dateOfBirth" },
  //       { data: "mobileNo" },
  //       { data: "email" },
  //       { data: "actions" }
  //     ],
  //     pageLength: 15,
  //     ordering: true,
  //     searching: false,
  //     lengthChange: false
  //     // serverSide: true
  //   });
  // }

  // getStudentDetailsForFilters()
  // {
  //   let stdData = {
  //     "institutionID":1
  //   }

  //   this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
  //     if(res.success){
  //       // console.log(res.data);
  //       this.allStd = res.data;

  //       this.allStd.forEach(std => {
  //         let stdInfo = {
  //           roll: std.rollNo,
  //           // photo: std.studentProfPicPath,
  //           name: std.firstName,
  //           gender: std.gender,
  //           // parentsName: std.fatherFName,
  //           // class: std.className,
  //           // section: std.sectionName,
  //           // address: std.profileDetails.permanentAddress1,
  //           // dateOfBirth: std.date_of_birth,
  //           // mobileNo: std.mobileNo,
  //           // email: std.fatherEmailID
  //         };

  //         // this.rows.push(stdInfo);
  //       });

  //       // console.log(this.rows);
  //       // localStorage.setItem('regStd', JSON.stringify(res.studentList[0]));
  //       // this.router.navigate(['/students/list']);
  //     }else{
  //       this.allStd = [];
  //       // this.router.navigate(['/students/add']);
  //     }
  //   });
  //   // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));
  // }







  fetch(cb) {
    
    const req = new XMLHttpRequest();

    req.responseType = "json";
    req.open(
      "POST",
      `${environment.apiUrl}student_profile/getStudentDetailsForFilters`,
      true
    );

    req.setRequestHeader("Content-Type", "application/json");

    req.onload = () => {
      cb(req.response);
    };

    let stdData = {
      institutionID: this.cookie.get("insID"),
    };


    // console.log(stdData);
    req.send(JSON.stringify(stdData));
  }







  goToStdView(stdId) {
    // console.log(stdId);
    Helpers.setLoading(true);
    this.showStudentDetailsSection = true;
    this.stdId = stdId;
    // this.router.navigate([`/students/viewDetail/${stdId}`]);
    this.getStdDetails(this.stdId);
  }




  getStdDetails (id)
  {
    let stdData = {
      institutionID: this.cookie.get("insID"),
      studentID: id
    }

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
      if(res.success){
        // console.log(res.data[0]);
        this.stdDetailsData = res.data[0];
        // console.log('student details : ', this.stdDetailsData);        
        if(res.data[0].studentProfPicPath){
          this.url = res.data[0].studentProfPicPath;
        }else{
          this.url = './assets/img/pro-pic-placeholder.jpg';
        } 
        
        Helpers.setLoading(false);
      }else{
        Helpers.setLoading(false);
        // this.router.navigate(['/students/add']);
      }
    });
  }






  goToEditStd(stdId) {
    // console.log(stdId);
    this.router.navigate([`/students/edit/${stdId}`]);
  }






  goBackToList(){
    this.showStudentDetailsSection = false;
  }







  onClickShowMore(e){
    // console.log(e.target.innerText);
    if(e.target.innerText == "Show More"){
      this.showMoreBtnText = "Show Less";
      this.showDetailsPart = true;
    }else{
      this.showMoreBtnText = "Show More";
      this.showDetailsPart = false;
    }    
  }





  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   // filter our data
  //   const temp = this.temp.filter(function(d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.table.offset = 0;
  // }







  updateAdmissionNoFilter(event) {
    const val = event.target.value.toLowerCase();
    // console.log("Typed value ", val);

    if (val == "" || val == null) {
      // console.log("value is blank");

      this.fetch(data => {
        this.allStd = data.data;
        var shortStdArr = [];
        this.allStd.forEach(std => {
          let stdInfo = {
            admissionNo: std.admissionNo,
            photo: std.studentProfPicPath,
            name: std.firstName,
            gender: std.gender,
            parentsName: std.fatherFName,
            class: std.className,
            section: std.sectionName,
            address: std.profileDetails.permanentAddress1,
            dateOfBirth: std.date_of_birth,
            mobileNo: std.mobileNo,
            email: std.fatherEmailID,
            Id: std.studentID
          };

          shortStdArr.push(stdInfo);
        });

        this.rows = shortStdArr;
        // console.log(this.rows);
      });
    } else {
      // filter our data
      const temp = this.rows.filter(function(d) {
        if (d.admissionNo != null) {
          return d.admissionNo.toLowerCase().indexOf(val) !== -1 || !val;
        }
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }
  }







  updateClassFilter(event) {
    var val = event.value.toLowerCase();
    console.log("Typed value ", val);

    if (val == "All") {
      console.log('if called');
      
      this.fetch(data => {
        this.allStd = data.data;
        var shortStdArr = [];
        this.allStd.forEach(std => {
          let stdInfo = {
            admissionNo: std.admissionNo,
            photo: std.studentProfPicPath,
            name: std.firstName,
            gender: std.gender,
            parentsName: std.fatherFName,
            class: std.className,
            section: std.sectionName,
            address: std.profileDetails.permanentAddress1,
            dateOfBirth: std.date_of_birth,
            mobileNo: std.mobileNo,
            email: std.fatherEmailID,
            Id: std.studentID
          };

          shortStdArr.push(stdInfo);
        });

        this.rows = shortStdArr;
        // console.log(this.rows);
      });

      const temp = this.rows.filter(function(d) {
        return d.class.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.rows = temp;

    } else {

      console.log('else called');

      this.fetch(data => {
        this.allStd = data.data;
        var shortStdArr = [];
        this.allStd.forEach(std => {
          let stdInfo = {
            admissionNo: std.admissionNo,
            photo: std.studentProfPicPath,
            name: std.firstName,
            gender: std.gender,
            parentsName: std.fatherFName,
            class: std.className,
            section: std.sectionName,
            address: std.profileDetails.permanentAddress1,
            dateOfBirth: std.date_of_birth,
            mobileNo: std.mobileNo,
            email: std.fatherEmailID,
            Id: std.studentID
          };

          shortStdArr.push(stdInfo);
        });

        this.rows = shortStdArr;
        // console.log(this.rows);
      });
      
      const temp = this.rows.filter(function(d) {
        return d.class.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }
  }







  openConfirmsSwal(studentID) {
    swal({
      title: "Are you sure want to delete?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      // console.log(result);
      if (result.value) {
        //delete user profile details
        this.deleteStudent(studentID);
      }
    });
  }






  deleteStudent(studentID) {
    // console.log("Enter to delete student. id : ", studentID);

    let deleteStudentProfileInfoData = {
      id: studentID,
      delete: true
    };

    console.log('delete data : ', deleteStudentProfileInfoData);

    this.authServ
      .deleteStudentProfileDetails(deleteStudentProfileInfoData)
      .subscribe((res: any) => {
        console.log("after student profile delete :", res);

        if (res.success) {
          let deleteStudentInfoData = {
            id: studentID,
            delete: true
          };

          this.authServ
            .deleteStudent(deleteStudentInfoData)
            .subscribe((res: any) => {
              // console.log("after student delete :", res);

              if (res.success) {
                this.fetch(data => {
                  this.allStd = data.data;
                  var shortStdArr = [];
                  this.allStd.forEach(std => {
                    let stdInfo = {
                      admissionNo: std.admissionNo,
                      photo: std.studentProfPicPath,
                      name: std.firstName,
                      gender: std.gender,
                      parentsName: std.fatherFName,
                      class: std.className,
                      section: std.sectionName,
                      address: std.profileDetails.permanentAddress1,
                      dateOfBirth: std.date_of_birth,
                      mobileNo: std.mobileNo,
                      email: std.fatherEmailID,
                      Id: std.studentID
                    };

                    shortStdArr.push(stdInfo);
                  });

                  this.rows = shortStdArr;
                });

                swal("Deleted!", "Student deleted Successfully.", "success");

                // this.addToast(
                //   {title:'SUCCESS!', msg:'Student Deleted Successfully.', timeout: 4000, theme:'default', position:'top-right', type:'success'}
                // );

                // this.router.navigate(['/students/list']);
              } else {
                swal(
                  "Sorry!",
                  "Unable to delete student. Please Try Again.",
                  "error"
                );
                // this.router.navigate(['/students/list']);
                // return false;
              }
            });
        } else {
          // this.router.navigate(['/students/list']);
          swal(
            "Sorry!",
            "Unable to delete student. Please Try Again.",
            "error"
          );
          // return false;
        }
      });
  }





  addToast(options) {
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
  }




  exportAsXLSX():void {
    this.authServ.exportAsExcelFile(this.allStd, 'student-list');
  }




  insSelectDetails() {
    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");

    let senddata = {
      institutionID: this.cookie.get("insID")
    };

    this.http
      .post(
        `${environment.apiUrl}institution/getInsSpecificSelectDetails`,
        senddata
      )
      .map(res => res)
      .subscribe((data: any) => {
        // console.log(data);
        // this.streamData = data.streamList;
        this.classData = data.classList;
        // this.routeData = data.routeList;
        // this.sectionData = data.classList.sectionDetails;
        // this.classData.forEach(ele => {
        //   this.sectionData.push(ele.sectionDetails);
        // });
      });
  }
}
