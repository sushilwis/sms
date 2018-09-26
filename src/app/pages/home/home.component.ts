import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  chart = [];

  constructor(private _script: ScriptLoaderService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    // this._script.load('./assets/js/scripts/dashboard_1_demo.js');


    var a = {
      labels: ["Collection", "Fees", "Expenses"],
      datasets: [
        {
          label: "Collections",
          borderColor: "#4286f4",
          backgroundColor: "#4286f4",
          data: [9000]
        },
        {
          label: "Fees",
          backgroundColor: "#c12424",
          borderColor: "#c12424",
          data: [7500]
        },
        {
          label: "Expences",
          backgroundColor: "#6dc62d",
          borderColor: "#6dc62d",
          data: [5000]
        }
      ]},

      t = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },

            legend: {
              display: true,
              position: 'left',
              labels: {
                boxWidth: 12,
                padding: 15,	
              }
            }
          },

      el = <HTMLCanvasElement>document.getElementById("collection_chart");
      var canvas_1 = el.getContext("2d");

      new Chart(canvas_1, {
        type: "bar",
        data: a,
        options: t
      });






      var barData = {
        labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "Students",
                backgroundColor: '#2ecc71',
                borderColor: "#fff",
                data: [589, 698, 884, 588, 757, 589, 921]
            }
        ]
      };
    
      var barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };


    var ctx = <HTMLCanvasElement>document.getElementById("student_chart");
    var canvas_2 = ctx.getContext("2d");

    new Chart(canvas_2, {
      type: 'bar', 
      data: barData, 
      options: barOptions
    });




  }

}
