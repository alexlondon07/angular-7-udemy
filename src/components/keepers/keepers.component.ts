import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
})
export class KeepersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('OnInit KeepersComponent');
  }

}
