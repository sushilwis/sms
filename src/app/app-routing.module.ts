import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { LayoutComponent } from ".//layouts/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { AddStudentComponent } from "./pages/students/add-student/add-student.component";
import { EditStudentComponent } from "./pages/students/edit-student/edit-student.component";
import { StudentListComponent } from "./pages/students/student-list/student-list.component";
import { ViewStudentComponent } from "./pages/students/view-student/view-student.component";
import { AddStudentDetailsComponent } from "./pages/students/add-student-details/add-student-details.component";
import { EditStudentDetailsComponent } from "./pages/students/edit-student-details/edit-student-details.component";
import { LoginComponent } from "./pages/login/login.component";
import { Error404Component } from "./pages/error-404/error-404.component";
import { Error500Component } from "./pages/error-500/error-500.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule } from "angular-calendar";
import { HttpClientModule } from "@angular/common/http";
import { GuardGuard } from "./_services/guard/guard.guard";
import { ToastyModule } from "ng2-toasty";
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material';
// import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";



import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { UserAccessControlComponent } from "./pages/user-access-control/user-access-control.component";
import { TimeTableConfigurationComponent } from "./pages/time-table-configuration/time-table-configuration.component";
import { ViewTimeComponent } from "./pages/view-time/view-time.component";
import { IssuseNewCertificateComponent } from "./pages/issuse-new-certificate/issuse-new-certificate.component";

// import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        component: HomeComponent,
        canActivate: [GuardGuard]
      },

      {
        path: "students/add",
        component: AddStudentComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "students/edit/:id",
        component: EditStudentComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "students/list",
        component: StudentListComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "students/viewDetail/:id",
        component: ViewStudentComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "students/addDetails",
        component: AddStudentDetailsComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "students/editDetails/:id",
        component: EditStudentDetailsComponent,
        canActivate: [GuardGuard]
      },
      {
        path: "user/user-access-control",
        component: UserAccessControlComponent,
        canActivate: [GuardGuard]
      },

      {
        path: "user-config/timetable",
        component: TimeTableConfigurationComponent,
        canActivate: [GuardGuard]
      },

      {
        path: "teacher-activity/view-time-table",
        component: ViewTimeComponent,
        canActivate: [GuardGuard]
      },

      {
        path: "certificate-management/issuse-new-certificate",
        component: IssuseNewCertificateComponent,
        canActivate: [GuardGuard]
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "error_404",
    component: Error404Component
  },
  {
    path: "error_500",
    component: Error500Component
  },
  {
    path: "**",
    redirectTo: "error_404",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    Error404Component,
    Error500Component,
    AddStudentComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    HttpClientModule,
    ToastyModule.forRoot(),
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {}
