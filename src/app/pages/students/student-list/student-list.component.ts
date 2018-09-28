import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  // public data: any;
  // public sortOrder = 'desc';
  public rows = [
    { 
      name: 'Austin', roll: '001', gender: 'Male', class: '7', section: 'B', email: "abc@gmail.com" 
    },
    { 
      name: 'John', roll: '002', gender: 'Male', class: '7', section: 'B', email: "abc@gmail.com" 
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
