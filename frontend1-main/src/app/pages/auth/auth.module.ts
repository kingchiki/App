import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "./auth.component";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [AuthService]
})
export class AuthModule { }

