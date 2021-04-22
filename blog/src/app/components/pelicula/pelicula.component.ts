import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Import model
import {Pelicula} from '../../models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  @Input() pelicula: Pelicula;

  // Declared prop output to send of component child a component parent
  @Output() marcarFavorita = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(event, pelicula){
    // Emit a object json with info pelicula a event marcarFavorita
    this.marcarFavorita.emit({
      pelicula: pelicula
    });
  }
}
