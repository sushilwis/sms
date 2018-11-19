import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "[app-sidebar]",
  templateUrl: "./app-sidebar.component.html"
})
export class AppSidebar implements OnInit, AfterViewInit {
  
  @ViewChild("enrollment", { read: ElementRef }) item: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {}
}
