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
// import jquery as $ from "jquery";

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
  // encapsulation: ViewEncapsulation.None,
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
export class StudentListComponent implements OnInit, AfterViewInit {
  temp = [];
  rowsFilter = [];
  public data: any;
  // public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  allStd: any;
  position: any;
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
    private toastyService: ToastyService
  ) {
    this.fetch(data => {
      this.allStd = data.data;
      var shortStdArr = [];
      this.allStd.forEach(std => {
        let stdInfo = {
          roll: std.rollNo,
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
      console.log(this.rows);
    });
  }

  ngOnInit() {
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
      `http://13.59.10.105:8080/campusquo_services/api/student_profile/getStudentDetailsForFilters`,
      true
    );

    req.setRequestHeader("Content-Type", "application/json");

    req.onload = () => {
      cb(req.response);
    };

    let stdData = {
      institutionID: 1
    };

    req.send(JSON.stringify(stdData));
  }

  goToStdView(stdId) {
    console.log(stdId);
    this.router.navigate([`/students/viewDetail/${stdId}`]);
  }

  goToEditStd(stdId) {
    console.log(stdId);
    this.router.navigate([`/students/edit/${stdId}`]);
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

  updateRollFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("Typed value ", val);

    if (val == "" || val == null) {
      console.log("value is blank");

      this.fetch(data => {
        this.allStd = data.data;
        var shortStdArr = [];
        this.allStd.forEach(std => {
          let stdInfo = {
            roll: std.rollNo,
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
        console.log(d.roll);
        if (d.roll != null) {
          return d.roll.toLowerCase().indexOf(val) !== -1 || !val;
        }
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }
  }

  updateSectionFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("Typed value ", val);

    if (val == "") {
      console.log("sECTION value is blank");

      this.fetch(data => {
        this.allStd = data.data;
        var shortStdArr = [];
        this.allStd.forEach(std => {
          let stdInfo = {
            roll: std.rollNo,
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
        return d.section.toLowerCase().indexOf(val) !== -1 || !val;
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
    console.log("Enter to delete student. id : ", studentID);

    let deleteStudentProfileInfoData = {
      id: studentID,
      delete: true
    };

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
              console.log("after student delete :", res);

              if (res.success) {
                this.fetch(data => {
                  this.allStd = data.data;
                  var shortStdArr = [];
                  this.allStd.forEach(std => {
                    let stdInfo = {
                      roll: std.rollNo,
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
}
