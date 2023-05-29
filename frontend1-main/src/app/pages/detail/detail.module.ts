import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from "./detail.component";
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared/services/shared.service";
@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers:[SharedService]
})
export class DetailModule { }

