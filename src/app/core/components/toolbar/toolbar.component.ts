import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styles: [`:host {
    background-color: rgb(235, 170, 49);
    color: #FFFFFF;
    display: block;
    height: 48px;
    padding: 0 16px;
  }

  h1 {
    display: inline;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 0.1px;
    line-height: 48px;
  }

  .more {
    background: url("/assets/svg/more.svg");
    float: right;
    height: 24px;
    margin-top: 12px;
    width: 24px;
  }`]
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
