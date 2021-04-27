// Import component and load hooks
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

// Import model created
import {Pelicula} from '../../models/pelicula';

// Import service
import {PeliculaService} from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  
  // Occupying model Pelicula
  public peliculas: Pelicula[];

  public favorita: Pelicula[];
  public fecha: any;

  constructor(
    // Prop vinculate a service
    private _peliculaService: PeliculaService
  ){
    this.titulo = "Componentes peliculas";
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2021, 4, 22);
  }

  // Hooks
  ngOnInit(): void {
    console.log("Componente iniciado");

    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck(){
    console.log("Docheck lanzado");
  }

  ngOnDestroy(){
    console.log("El componente se va a aeliminar de la ejecucion");
  }

  // Methods Manuals
  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
    console.log(this.peliculas);
  }

  // It is a event of a prop output
  mostrarFavorita(event){
    // Recibed info of event output
    this.favorita = event.pelicula
  }

}
