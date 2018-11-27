import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { CookieService } from "ngx-cookie-service";
import { transition, trigger, style, animate } from "@angular/animations";

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
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

export class ViewStudentComponent implements OnInit {

  url: string = '';
  stdId: any;
  stdDetailsData: any;
  showMoreBtnText: any;
  showDetailsPart: boolean;
  
  constructor(
    private actRoute: ActivatedRoute, 
    private router: Router,
    private cookie: CookieService,
    private authServ: AuthService) { }

  ngOnInit() {
    this.url = './assets/img/pro-pic-placeholder.jpg';

    this.actRoute.params.subscribe(data => {
      this.stdId = data.id;
    });

    this.getStdDetails();
    this.showMoreBtnText = "Show More";
    this.showDetailsPart = false;
  }



  getStdDetails ()
  {
    let stdData = {
      institutionID: this.cookie.get("insID"),
      studentID: this.stdId
    }

    this.authServ.getStudentDetailsForFilters(stdData).subscribe((res:any) => {
      if(res.success){
        console.log(res.data[0]);
        this.stdDetailsData = res.data[0];

        if(res.data[0].studentProfPicPath){
          this.url = res.data[0].studentProfPicPath;
        }else{
          this.url = './assets/img/pro-pic-placeholder.jpg';
        }        
      }else{
        // this.router.navigate(['/students/add']);
      }
    });
  }




  goToEditStd(stdId) {
    // console.log(stdId);
    this.router.navigate([`/students/edit/${stdId}`]);
  }




  onClickShowMore(e){
    console.log(e.target.innerText);
    if(e.target.innerText == "Show More"){
      this.showMoreBtnText = "Show Less";
      this.showDetailsPart = true;
    }else{
      this.showMoreBtnText = "Show More";
      this.showDetailsPart = false;
    }    
  }





}
