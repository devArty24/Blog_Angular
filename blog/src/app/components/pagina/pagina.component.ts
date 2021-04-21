import { Component, OnInit } from '@angular/core';

// Load router components to be able to manipulate routes topic
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  // Here properties and later to be able to occupy it in the template (HTML)
  public nombre: string;
  public apellidos: string;

  constructor(
    // Put services router before loaded
    private _route: ActivatedRoute, /* Example with this, extract parmas of url */
    private _router: Router /* Example with this redirections */
  ){}

  ngOnInit(): void {
    // Get params of url
    this._route.params.subscribe((params: Params)=>{
      this.nombre = params.nombre;
      this.apellidos = params.apellidos;
    });
  }

  redireccion(){
    // Doing a redirect with parameters
    this._router.navigate(['/pagina-de-pruebas', 'Arturo', 'Rodriguez']);
  }

}
