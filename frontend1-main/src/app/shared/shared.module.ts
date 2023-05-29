import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {RecipeCardComponent} from "./components/recipe-card/recipe-card.component";
import {RecipeAddPopupComponent} from "./components/recipe-add-popup/recipe-add-popup.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [HeaderComponent, FooterComponent, RecipeCardComponent, RecipeAddPopupComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
  exports: [HeaderComponent, FooterComponent, RecipeCardComponent, RecipeAddPopupComponent],

})
export class SharedModule {
}

