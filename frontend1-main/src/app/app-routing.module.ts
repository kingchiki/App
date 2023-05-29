import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ResultComponent} from "./pages/result/result.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {DetailComponent} from "./pages/detail/detail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: ResultComponent
  },
  {
    path: 'search/:query',
    component: ResultComponent
  },
  {
    path: 'my-recipes',
    component: ResultComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

