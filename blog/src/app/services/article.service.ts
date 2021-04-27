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

    getArticles():Observable<any>{
        return this._http.get(this.url+'/articles');
    }
}