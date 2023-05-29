import {Component, Input} from '@angular/core';
import {Recipe, ImageInfo} from "../../services/shared.service";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  defImage = "/assets/img-recipe-card.webp"

  getImage(image: ImageInfo): string {
    if (image) {
      if (image.mimeType === "src")
        return image.data
      else
        return `data:${image?.mimeType};base64,${image?.data}`
    } else
      return this.defImage
  }

  getOnline() {
    return this.recipe.isOnline ? 'true': 'false';
  }
}
