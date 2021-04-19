import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;

  constructor(){
    this.titulo = "Componentes peliculas";
    console.log("cosntructor lanzado");
  }

  // Hooks
  ngOnInit(): void {
    console.log("Componente iniciado");
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
  }

}
