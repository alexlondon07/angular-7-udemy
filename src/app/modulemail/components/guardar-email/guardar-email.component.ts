import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'guardar-email',
  templateUrl: './guardar-email.component.html'
})
export class GuardarEmailComponent implements OnInit {
  emailContact: string;
  constructor() { }

  ngOnInit() {
  }

  saveEmail(){
    localStorage.setItem('emailContact', this.emailContact);
  }

}
