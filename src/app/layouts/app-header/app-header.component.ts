import { Component, AfterViewInit, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "[app-header]",
  templateUrl: "./app-header.component.html"
})
export class AppHeader implements OnInit, AfterViewInit {

  userDetails;
  menuArr: any = [];
  matchItem: any;

  constructor(private cookie: CookieService, private router: Router) {}

  ngOnInit() {
    this.getLoggedUserDetail();
  }

  ngAfterViewInit() {}

  userLogout() {
    let asd = this.cookie.delete("sessionId");
    console.log(asd);

    if (
      this.cookie.get("sessionId") == null ||
      this.cookie.get("sessionId") == undefined
    ) {
      this.router.navigate(["/login"]);
    } else {
      this.cookie.delete("sessionId");
    }
  }

  getLoggedUserDetail() {
    this.userDetails = {
      name: this.cookie.get("fName"),
      uID: this.cookie.get("uID"),
      uName: this.cookie.get("uName"),
      uRole: this.cookie.get("uRole")
    };

    // console.log(this.userDetails);
  }



  searchMenu(e) {
    console.log("search function called. value ", e.target.value);
    
    this.menuArr = ["enrollment", "etudent admission", "bulk upload", "registration", "enquery", "fee management", "student management", "update student", "view student", "roll no assign", "attandance report", "view time table", "teacher activities", "examination management", "user managements", "notifications & events", "transport management", "finance management", "leave management", "certificates management"];

    for (let index = 0; index < this.menuArr.length; index++) {
      var matchFound = this.menuArr[index].match(e.target.value); 
      
      if(matchFound != null){
        this.matchItem = matchFound.input.replace(' ', '-');
        break;
      }
    }

    console.log(this.matchItem);
    this.selectMenuItemFromSideMenu(this.matchItem);    
  }





  selectMenuItemFromSideMenu(id) {
    var item = document.getElementById(id);
    console.log(item); 
  }


}
