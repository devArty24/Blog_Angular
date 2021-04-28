import { Component, OnInit } from '@angular/core';

// Import Service of Articles
import {ArticleService} from '../../services/article.service';

// Import model Article
import {Article} from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {
  // Here declare property with data type
  public title: string;

  public articles: Article[];

  constructor(
    private _artilceService: ArticleService
  ){
    // Here give value to the bariable to the properties above
    this.title = "Ultimos articulos";
  }

  ngOnInit(): void {
    this._artilceService.getArticles(true).subscribe(
      response => {
        if(response.articles){
          // Asign data response a porp articles
          this.articles = response.articles
          console.log(this.articles);
        }else{

        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
