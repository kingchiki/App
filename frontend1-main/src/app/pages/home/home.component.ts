import {Component, OnInit} from '@angular/core';
import {Recipe, SharedService} from "../../shared/services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: SharedService) {
  }

  recipeList: Recipe[] = []

  ngOnInit(): void {
    this.sharedService.getAllRecipes().subscribe((data: Recipe[]) => {
      console.log({data})
      if (data.length > 0) {
        this.recipeList = data
      }
    })
  }
}
