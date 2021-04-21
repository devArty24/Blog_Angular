import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Here declare property with data type
  public title: string;

  constructor(){
    // Here give value to the bariable to the properties above
    this.title = "Ultimos articulos";
  }

  ngOnInit(): void {
  }

}
