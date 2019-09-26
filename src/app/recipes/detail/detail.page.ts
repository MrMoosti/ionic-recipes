import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private route: ActivatedRoute, public rs: RecipesService) {}

  recipe: Recipe;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('recipe');
    this.recipe = this.rs.getRecipeById(parseInt(id, 10));
  }
}
