import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ColorPickerModule } from "ngx-color-picker";
import { BrowserXhr } from "@angular/http";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { Ng2ImgMaxModule } from "ng2-img-max";
import { ToastyModule } from "ng2-toasty";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { AppComponent } from ".//app.component";
import { AppRoutingModule } from ".//app-routing.module";
import { LayoutModule } from ".//layouts/layout.module";
import { ScriptLoaderService } from "./_services/script-loader.service";
import { CalendarModule } from "angular-calendar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./_services/auth/auth.service";
import { NotificationService } from "./_services/notification.service";
import { SharedModule } from "./shared/shared.module";
import { CookieService } from "ngx-cookie-service";
import { GuardGuard } from "./_services/guard/guard.guard";
import { StudentListComponent } from "./pages/students/student-list/student-list.component";
import { ViewStudentComponent } from "./pages/students/view-student/view-student.component";
import { AddStudentDetailsComponent } from "./pages/students/add-student-details/add-student-details.component";
import { CustExtBrowserXhr } from "./cust-ext-browser-xhr";
import { EditStudentComponent } from "./pages/students/edit-student/edit-student.component";
import { EditStudentDetailsComponent } from "./pages/students/edit-student-details/edit-student-details.component";
import { UserAccessControlComponent } from './pages/user-access-control/user-access-control.component';
import { TimeTableConfigurationComponent } from './pages/time-table-configuration/time-table-configuration.component';
import { IssuseNewCertificateComponent } from './pages/issuse-new-certificate/issuse-new-certificate.component';
import { ViewTimeComponent } from './pages/view-time/view-time.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    ViewStudentComponent,
    AddStudentDetailsComponent,
    EditStudentComponent,
    EditStudentDetailsComponent,
    UserAccessControlComponent,
    TimeTableConfigurationComponent,
    IssuseNewCertificateComponent,
    ViewTimeComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgxDatatableModule,
    LayoutModule,
    CalendarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgbModule.forRoot(),
    SharedModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2ImgMaxModule,
    ToastyModule.forRoot(),
  ],

  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ScriptLoaderService,
    AuthService,
    GuardGuard,
    NotificationService,
    CookieService,
    { provide: BrowserXhr, useClass: CustExtBrowserXhr }
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
