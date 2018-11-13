import { Component, AfterViewInit, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "[app-header]",
  templateUrl: "./app-header.component.html"
})
export class AppHeader implements OnInit, AfterViewInit {
  userDetails;

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
}
