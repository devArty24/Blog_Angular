import { Component, OnInit } from '@angular/core';

// Import model
import {Article} from '../../models/article';

// Import Service to make request http
import {ArticleService} from '../../services/article.service';

// Import modules of routes
import {Router, ActivatedRoute, Params} from '@angular/router';

// Import url Global
import {Global} from '../../services/global';

import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status: string;
  public is_edit: boolean;
  public pageTitle: string;
  public url: string;

  // Config prop to upload files
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png .gif .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + '/upload-image',
      method: "POST"
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Upload image of article...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ){
    this.article = new Article('','','',null,null);
    this.is_edit= true;
    this.pageTitle = "Editar articulo";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit(){
    this._articleService.update(this.article._id, this.article).subscribe(
      response =>{
        if(response.status == "success"){
          console.log(response);
          this.status = "success";
          this.article = response.article;

          // Alert
          swal(
            'Articulo editado!!',
            'El articulo se edito correctamente',
            'success'
          );

          this._router.navigate(['/blog/articulo', this.article._id]);
        }else{
          this.status = "error";
        }
      },
      error => {
        console.log(error);
        this.status = "error";

        // Alert
        swal(
          'Edicion fallida!!',
          'El articulo no sepudo editar',
          'error'
        );
      }
    );
  }

  imagenUpload(data){
    // Catch response API
    let imageData = data.body.image;

    // Asign response (name of image)
    this.article.image = imageData;
  }

  getArticle(){
    // Get param url
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


}
