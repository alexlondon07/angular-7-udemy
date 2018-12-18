import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Angular Course 4';
  emailContact: string;

  ngOnInit(){
    this.getEmail();
  }
  ngDoCheck(){
    this.getEmail();
  }

  getEmail(){
    this.emailContact = localStorage.getItem('emailContact');
  }

  deleteEmail(){
    localStorage.removeItem('emailContact');
    localStorage.clear();
    this.emailContact = null;
  }
}
