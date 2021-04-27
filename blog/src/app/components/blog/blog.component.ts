import { Component, OnInit } from '@angular/core';

// Import model Article
import {Article} from 'src/app/models/article';

// Import service article
import {ArticleService} from '../../services/article.service';

// Import url
import {Global} from '../../services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {
  public articles: Article[];

  public url: string;

  constructor(
    private _artilceService: ArticleService
  ){
    this.url = Global.url
  }

  ngOnInit(): void {

    this._artilceService.getArticles().subscribe(
      response => {
        if(response.articles){
          // Asign data response a porp articles
          this.articles = response.articles
        }else{

        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
