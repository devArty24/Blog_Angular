// Import Injectable
import {Injectable} from '@angular/core';

// Import library to request HTTP
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Import Obserbale
import {Observable} from 'rxjs';

// Import model
import {Article} from '../models/article';

// EXport url Global
import {Global} from './global';

// Utilized Decorator
@Injectable()
export class ArticleService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    pruebas(){
        return "Soy el servicio de articulos";
    }

    getArticles(last:any = null):Observable<any>{
        var articles = '/articles';
        
        if(last != null){
            var articles = '/articles/true';
        }

        return this._http.get(this.url+articles);
    }

    getArticle(articleId):Observable<any>{
        return this._http.get(this.url+'/article/'+articleId)
    }

    search(searchString):Observable<any>{
        return this._http.get(this.url+'/search/'+searchString)
    }

    create(article):Observable<any>{
        // Create variable params and convert object literal a json string
        let params = JSON.stringify(article);

        // Config headers to send
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Make request http sending params and headers
        return this._http.post(this.url+'/save', params, {headers: headers})
    }

    update(id, article):Observable<any>{
        // Convert object literal a json string
        let params = JSON.stringify(article);

        // Config headers to send
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        
        // Make request http sending params and headers
        return this._http.put(this.url+'/article/'+id, params, {headers:headers});
    }

    delete(id):Observable<any>{
        // Config headers to send
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.delete(this.url+'/article/'+id, {headers:headers});
    }
}