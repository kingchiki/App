import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from "./pages/home/home.module";
import {ResultModule} from "./pages/result/result.module";
import {AuthModule} from "./pages/auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import { DetailComponent } from './pages/detail/detail.component';
import {DetailModule} from "./pages/detail/detail.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ResultModule,
    AuthModule,
    DetailModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
