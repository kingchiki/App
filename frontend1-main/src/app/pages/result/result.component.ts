import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeAddPopupComponent} from "../../shared/components/recipe-add-popup/recipe-add-popup.component";
import {Recipe, SharedService} from "../../shared/services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthResponse} from "../../shared/services/auth.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @ViewChild('popup', {static: false}) popup!: RecipeAddPopupComponent;
  recipeList: Recipe[] = [];

  isProfile: boolean = false

  userData: AuthResponse = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : null

  query: string = ""


  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit(): void {
    const currentPath = this.route.snapshot.routeConfig?.path;

    if (currentPath?.includes('search')) {
      // Add your logic for search route here
      console.log("search", this.route.paramMap)
      this.route.paramMap.subscribe(params => {
        const query = params.get('query');
        this.query = query || ""
        console.log("search", {query})

        this.isProfile = false
        this.fetchData(query)
        // Use the query value in your component
      });
    } else if (currentPath === 'my-recipes') {
      if (this.userData) {
        this.isProfile = true
        this.fetchData()
      } else {
        this.router.navigate(["auth"])
      }

      // Add your logic for my-recipes route here
    }
  }

  fetchData(query: any = "", isOnline: any = false) {
    if (this.isProfile) {
      this.sharedService.getRecipesByUser().subscribe((data: Recipe[]) => {
        console.log({data})
        if (data.length > 0) {
          this.recipeList = data
        }
      })
    } else {
      this.sharedService.searchRecipe(`query=${query}&isOnline=${isOnline}`).subscribe((data: Recipe[] | any) => {
        console.log({data})
        if (data.length > 0) {
          if (isOnline)
            this.recipeList = data.map((item: any) => {
              return {
                name: item.title,
                image: {
                  data: item.image,
                  mimeType: "src"
                },
                readyInMinutes: 'N/A',
                user: {
                  name: "Internet"
                },
                isOnline: true,
                id: item.id

              }
            })
          else
            this.recipeList = data

        } else {
          this.recipeList = []
        }
      })
    }
  }

  showPopup() {
    this.popup.show();
  }

}

