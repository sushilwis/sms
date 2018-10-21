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
import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

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
        component: EditStudentComponent
      },
      {
        path: "students/list",
        component: StudentListComponent
      },
      {
        path: "students/viewDetail/:id",
        component: ViewStudentComponent
      },
      {
        path: "students/addDetails",
        component: AddStudentDetailsComponent
      },
      {
        path: "students/editDetails/:id",
        component: EditStudentDetailsComponent
      }
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
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    HttpClientModule,
    ToastyModule.forRoot(),
    MatFormFieldModule,
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
