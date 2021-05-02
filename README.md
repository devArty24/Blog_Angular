# Blog_Angular

<ul>
  <li>
    <a href="#aboutProject">About Project</a>
  </li>
  <li>
    <a href="#keyFeat">Key Features</a>
  </li>
  <li>
    <a href="#install">Installation</a>
  </li>
  <li>
    <a href="#fixBug">Fix bugs</a>
  </li>
</ul>
<div id="aboutProject">
  <h1>About Project</h1>
  <article class="text-justify">
    <p>The code allows you to create articles using a form with a title, description, also contains the upload of images for the article on the main page of the blog all the            articles created are listed, in the sidebar there is a search engine to filter the articles and within the article the action of editing or deleting is found, these functions point to the RESTfull API.
    </p>
  </article>
</div>
<div id="keyFeat">
  <h2>Key Features</h2>
  <article class="text-justify">
    <ol>
      <li>API RESTfull</li>
      <li>Node.js v14.15.1</li>
      <li>npm v6.14.9</li>
      <li>Routes with express.js</li>
      <li>body-parser</li>
      <li>moongose</li>
      <li>connect-multiparty</li>
      <li>validator</li>
      <li>@angular/cli@11.2.9</li>
      <li>angular2-moment</li>
      <li>angular-file-uploader v7.0.3</li>
      <li>SweetAlert</li>
      <li>mongoDB v4.2.6</li>
      <li>CSS3 Native</li>
      <li>Angular v11.2.10</li>
    </ol>
  </article>
</div>
<div id="install">
  <h2>Installation</h2>
  <article class="text-justify">
    <div>
      <p>In the backend folder find the file index.js in the line 17, you can change the port of the mongo service and blog_angular for other name to the DB</p>
      <pre>/* If the port is the same and you don't want to change the name of the base, leave it like that */
  mongoose.connect('mongodb://localhost:27017/blog_angular', {useNewUrlParser:true, useUnifiedTopology: true})
      </pre>
    </div>
    <div>
      <p>At the root of the backend folder, create a new folder called upload and inside it create another folder called articles</p>
      <pre>/* It should be something like this, the images that are uploaded are saved there */
 - controllers
 - models
 - routes
 + upload/ -> articles
      </pre>
    </div>
    <div>
      <p>Through terminal or command prompt, update or install dependencies</p>
      <pre>/* This command execute positioned in the terminal and in the backend folder and then in blog */
 npm update
      </pre>
    </div>
    <div>
      <p>Remember to have mongo running, the node.js server is running it being inside the backend and finally angular this running it inside the blog</p>
    </div>
  </article>
</div>
<div id="fixBug">
  <h2>Fix bugs</h2>
  Probably the sweetalert library throws this error:
  <p>Failed to compile.
    node_modules/sweetalert/typings/sweetalert.d.ts:4:9 - error TS2403: Subsequent variable declarations must have the same type.  Variable 'swal' must be of type 'typeof import</p>
<pre>
/* Fix it, in node_modules /sweetalert/typings/sweetalert.d.ts open the file and comment the constant swal. It should look like the code below this in the blog folder */

declare global {
     // const swal: SweetAlert;
     const sweetAlert: SweetAlert;
}
</pre>
</div>








