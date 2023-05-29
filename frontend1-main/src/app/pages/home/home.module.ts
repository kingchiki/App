import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared/services/shared.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [SharedService]
})
export class HomeModule { }

