import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild
} from "@angular/core";
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
  className: any;
  currentIdValue: any;
  previousValue: any;

  @ViewChild("enrollment", { read: ElementRef }) item: ElementRef;

  constructor(private cookie: CookieService, private router: Router) {}

  ngOnInit() {
    this.getLoggedUserDetail();
    // this.selectMenuItemFromSideMenu("enrollment");
  }

  ngAfterViewInit() {
    // this.selectMenuItemFromSideMenu("enrollment");
  }

  userLogout() {
    let asd = this.cookie.delete("sessionId");
    // console.log(asd);

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
    // console.log("search function called. value ", e.target.value);

    this.menuArr = [
      "enrollment",
      "student admission",
      "bulk upload",
      "registration",
      "enquery",
      "fee management",
      "student management",
      "update student",
      "view student",
      "roll no assign",
      "attandance report",
      "view time table",
      "teacher activities",
      "examination management",
      "user managements",
      "notifications & events",
      "transport management",
      "finance management",
      "leave management",
      "certificates management"
    ];

    for (let index = 0; index < this.menuArr.length; index++) {
      var matchFound = this.menuArr[index].match(e.target.value);

      if (matchFound != null) {
        this.matchItem = matchFound.input.replace(" ", "-");
        break;
      }
    }

    console.log(this.matchItem);
    this.selectMenuItemFromSideMenu(this.matchItem);
  }

  selectMenuItemFromSideMenu(id) {

    this.currentIdValue = id;
    // this.previousValue = this.currentIdValue;

    // if(this.currentIdValue == id){
      var elem = <HTMLLIElement>document.getElementById(id);    
      // console.log(elem.classList.value.toString());
      // console.log(JSON.stringify(elem.classList));
      // console.log(typeof elem.classList);
  
      if(elem.getAttribute('data-hasSub') == "true"){
        console.log('match');
        console.log(elem);
        // console.log(elem.parentElement.children);

        Array.from(elem.parentElement.children).forEach((el)=>{
          let list = el.classList;
          if(list.value != ""){
            el.classList.remove('active');
            el.children[1].classList.remove('in');
          }          
        });

        elem.classList.add('active');
        elem.children[1].classList.add('in');
      }

      if(elem.getAttribute('data-hasSub') == "sub"){
        // console.log('match sub');
        // console.log(elem.parentElement.parentElement); 
        
        Array.from(elem.parentElement.parentElement.parentElement.children).forEach((el)=>{
          let list = (<HTMLElement>el).classList;
          if(list.value != ""){
            el.classList.remove('active');
            el.children[1].classList.remove('in');
          }          
        });

        elem.parentElement.parentElement.classList.add('active');
        elem.parentElement.parentElement.children[1].classList.add('in');
        // console.log(elem.children[0]);        
        elem.children[0].classList.add('text-warning font-weight-bold');
      }
    
    
  }
}
