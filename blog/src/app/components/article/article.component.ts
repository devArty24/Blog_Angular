import { Component, OnInit } from '@angular/core';

// Import Service
import {ArticleService} from '../../services/article.service';

// Import model
import {Article} from '../../models/article';

// Import things of routes
import {Router, ActivatedRoute, Params} from '@angular/router';

// Import url Global
import {Global} from '../../services/global';

// Import sweetalert
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  public article: Article;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.url = Global.url;
  }

  ngOnInit(): void{
    // Get param
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article;
            console.log(this.article);
          }else{
            this._router.navigate(['/home']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }

  delete(id){
    // Alert
    swal({
      title: "Estas seguro?",
      text: "Una vez borrado el articulo, no podra ser recuperado!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete) {
        this._articleService.delete(id).subscribe(
          response => {
            swal("El articulo ha sido borrado!", {
              icon: "success",
            });
            this._router.navigate(['/blog']);
          },
          error => {
            console.log(error);
            this._router.navigate(['/blog']);
          }
        );
      }else{
        swal("Tranquilo, no se borro el articulo!");
      }
    });
  }

}
