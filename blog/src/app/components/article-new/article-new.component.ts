import { Component, OnInit } from '@angular/core';

// Import model
import {Article} from '../../models/article';

// Import Service to make request http
import {ArticleService} from '../../services/article.service';

// Import modules of routes
import {Router, ActivatedRoute, Params} from '@angular/router';

// Import url Global
import {Global} from '../../services/global';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {
  public article: Article;
  public status: string;
  public pageTitle: string;
  public is_edit: boolean;

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
    this.pageTitle = "Crear  articulo";
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe(
      response =>{
        if(response.status == "success"){
          this.status = "success";
          this.article = response.article;
          this._router.navigate(['/blog']);
        }else{
          this.status = "error";
        }
      },
      error => {
        console.log(error);
        this.status = "error";
      }
    );
  }

  imagenUpload(data){
    // Catch response API
    let imageData = data.body.image;

    // Asign response (name of image)
    this.article.image = imageData;
  }
}
