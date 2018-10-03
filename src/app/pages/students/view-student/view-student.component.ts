import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  url: string = '';
  
  constructor() { }

  ngOnInit() {
    this.url = './assets/img/pro-pic-placeholder.jpg';
  }

}
