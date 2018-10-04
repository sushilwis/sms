import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  allStd: any;
  // public data: any;
  // public sortOrder = 'desc';
  public rows = [];

  constructor(
    private authServ: AuthService, 
    private router: Router,
    private cookie: CookieService
  ) { }


  ngOnInit() {
    let regStdDetail = localStorage.getItem('regStd');
    this.getStudentDetailsForFilters();
  }



  getStudentDetailsForFilters()
  {
    let stdData = {
      "institutionID":1
    }

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
      if(res.success){
        // console.log(res.data);
        this.allStd = res.data;

        this.allStd.forEach(element => {
          
        });
        // localStorage.setItem('regStd', JSON.stringify(res.studentList[0]));
        // this.router.navigate(['/students/list']);
      }else{
        this.allStd = [];
        // this.router.navigate(['/students/add']);
      }
    });
    // console.log('Stored Cookie value : ',this.cookie.get( 'sessionId'));    
  }





}
