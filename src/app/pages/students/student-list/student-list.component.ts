import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit, AfterViewInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  allStd: any;
  // public data: any;
  // public sortOrder = 'desc';
  rows = [
    // {roll: "1", name: "Mehur", gender: "Male"},
    // {roll: "1", name: "Mehur", gender: "Male"},
    // {roll: "1", name: "Mehur", gender: "Male"}
  ];

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService
  ) {
    // this.getStudentDetailsForFilters();
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
  }

  ngOnInit() {
    // let regStdDetail = localStorage.getItem('regStd');
    // this.getStudentDetailsForFilters();
  }

  ngAfterViewInit() {
    // let regStdDetail = localStorage.getItem('regStd');
    // this.getStudentDetailsForFilters();
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
}
