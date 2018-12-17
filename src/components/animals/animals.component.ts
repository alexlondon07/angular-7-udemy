import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
})
export class AnimalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('OnInit AnimalsComponent');
  }

}
