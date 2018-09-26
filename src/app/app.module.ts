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

@NgModule({
  declarations: [AppComponent],
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
    NgbModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
