import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ColorPickerModule } from "ngx-color-picker";

import { AppComponent } from ".//app.component";
import { AppRoutingModule } from ".//app-routing.module";
import { LayoutModule } from ".//layouts/layout.module";
import { ScriptLoaderService } from "./_services/script-loader.service";
import { CalendarModule } from "angular-calendar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from './_services/auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
import { GuardGuard } from './_services/guard/guard.guard';
import { AddStudentComponent } from './pages/students/add-student/add-student.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { ViewStudentComponent } from './pages/students/view-student/view-student.component';
import { AddStudentDetailsComponent } from './pages/students/add-student-details/add-student-details.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    ViewStudentComponent,
    AddStudentDetailsComponent,
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
    SharedModule
  ],

  schemas: [NO_ERRORS_SCHEMA],
  providers: [ScriptLoaderService, AuthService, GuardGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
