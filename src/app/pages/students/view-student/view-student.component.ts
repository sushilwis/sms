import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  url: string = '';
  stdId: any;
  stdDetailsData: any;
  
  constructor(
    private actRoute: ActivatedRoute, 
    private router: Router,
    private authServ: AuthService) { }

  ngOnInit() {
    this.url = './assets/img/pro-pic-placeholder.jpg';

    this.actRoute.params.subscribe(data => {
      // console.log(data);
      this.stdId = data.id;
    });

    this.getStdDetails();
  }



  getStdDetails ()
  {
    let stdData = {
      "institutionID":1,
      "studentID": this.stdId
    }

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
      if(res.success){
        // console.log(res.data[0]);
        this.stdDetailsData = res.data[0];
        this.url = res.data[0].studentProfPicPath;
      }else{
        // this.router.navigate(['/students/add']);
      }
    });
  }




  goToEditStd(stdId) {
    // console.log(stdId);
    this.router.navigate([`/students/edit/${stdId}`]);
  }





}
