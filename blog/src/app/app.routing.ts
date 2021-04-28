// Import modules router
import {ModuleWithProviders} from '@angular/core';

// Import module to create object routes
import {Routes, RouterModule} from '@angular/router';

// This module is necessary for when we export the module
import {Route} from '@angular/compiler/src/core';

// Import components to which you want to make an "exclusive" page
import {HomeComponent} from './components/home/home.component';
import {BlogComponent} from './components/blog/blog.component';
import {FormularioComponent} from './components/formulario/formulario.component';
import {PeliculasComponent} from './components/peliculas/peliculas.component';
import {PaginaComponent} from './components/pagina/pagina.component';
import {ErrorComponent} from './components/error/error.component';
import {ArticleComponent} from './components/article/article.component';
import {SearchComponent} from './components/search/search.component';

// Generate Array of routes
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component:BlogComponent},
    {path: 'blog/articulo/:id', component: ArticleComponent},
    {path: 'buscar/:search', component: SearchComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'peliculas', component: PeliculasComponent},

    // These two routes would make the parameters necessary or not
    {path: 'pagina-de-pruebas', component: PaginaComponent},
    {path: 'pagina-de-pruebas/:nombre/:apellidos', component: PaginaComponent},

    // The route below must be the last one because it is the route from when it does not exist, if it is placed before those of more routes, the other routes will not work
    {path: '**', component: ErrorComponent}
];

// Export this module
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);