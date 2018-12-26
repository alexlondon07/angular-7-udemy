import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  title = 'Bienvenido a NGZOO';
  constructor() { }

  ngOnInit() {
    console.log('OnInit HomeComponent');
  }

}
