import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../_services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit, AfterViewInit {
  temp = [];
  rowsFilter = [];
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

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private cookie: CookieService
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
    console.log(val);

    if(val == ""){
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

    }else {
      // filter our data
      const temp = this.rows.filter(function(d) {
        return d.roll.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }    
  }




  updateSectionFilter(event) {
    
    const val = event.target.value.toLowerCase();
    console.log(val);

    if(val == ""){
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

    }else {
      // filter our data
      const temp = this.rows.filter(function(d) {
        return d.section.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }    
  }






}
