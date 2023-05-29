import {Component, OnInit} from '@angular/core';
import {ImageInfo, Recipe, SharedService} from "../../shared/services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  recipe!: Recipe | any;
  constructor(private sharedService: SharedService,private route: ActivatedRoute, private router: Router) {
  }

  defImage = "/assets/img-recipe-card.webp"

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // id = '637275'
    const isOnline = this.route.snapshot.queryParamMap.get('isOnline');
    console.log({isOnline})
    this.sharedService.getRecipeDetails(id, isOnline).subscribe(item => {

      console.log(item)
      if (isOnline?.toLowerCase()==='true') {

        this.recipe = {
          name: item.title,
          image: {
            data: item.image,
            mimeType: "src"
          },
          readyInMinutes: item.readyInMinutes,
          user: {
            name: item.sourceName
          },
          description: item.instructions,
          isOnline: true,
          id: item.id

        }
      } else {
        this.recipe = item
      }

      console.log(this.recipe)
    })
  }

  getImage(image: ImageInfo): string {
    if (image) {
      if (image.mimeType === "src")
        return image.data
      else
        return `data:${image?.mimeType};base64,${image?.data}`
    } else
      return this.defImage
  }
}
