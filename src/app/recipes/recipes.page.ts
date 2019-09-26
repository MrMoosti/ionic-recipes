import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-home',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
})
export class RecipesPage {

  recipes: Recipe[] = [];
  constructor(private rs: RecipesService) {
    this.recipes = rs.getAllRecipes();
  }
}