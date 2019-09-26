import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  recipeName: string;
  recipeUrl: string;
  recipeIngredients: string[] = [];
  recipeInstructions: string[] = [];

  constructor(private rs: RecipesService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {

  }

  addIngredient() {

  }

  addInstruction() {

  }

  addRecipe() {

  }

  cancel() {
    this.router.navigateByUrl('/recipes');
  }
}
