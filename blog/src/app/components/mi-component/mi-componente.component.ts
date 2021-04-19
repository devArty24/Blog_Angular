import {Component} from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})

export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostrarPeliculas: boolean;

    constructor(){
        this.titulo = "hola mundo desde mi componente 2";
        this.comentario = "Este es el primer componente 2";
        this.year = 20212;
        this.mostrarPeliculas = true;
        console.log(this.titulo, this.comentario, this.year);
    }

    ocultarPeliculas(){
        this.mostrarPeliculas = false;
    }
}