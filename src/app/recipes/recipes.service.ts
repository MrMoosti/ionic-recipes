import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	recipes: Recipe[] = [];

	constructor(private router: Router, private alertController: AlertController) {
		if (localStorage.getItem('recipes')) {
			this.recipes = JSON.parse(localStorage.getItem('recipes'));
		} else {
			localStorage.setItem('recipes', JSON.stringify(this.recipes));
		}
	}

	addNewRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.updateStorage();
	}

	updateRecipe(recipe: Recipe) {
		let index = this.recipes.indexOf(this.recipes.find(x => x.id === recipe.id));
		this.recipes[index] = recipe;
		this.updateStorage();
	}

	updateStorage() {
		localStorage.setItem('recipes', JSON.stringify(this.recipes));
	}

	getAllRecipes(): Recipe[] {
		return this.recipes;
	}

	getRecipeById(id: number): Recipe {
		return this.recipes.find(x => x.id === id);
	}

	getLastRecipeId(): number {
		if (this.recipes.length > 0) {
			return this.recipes[this.recipes.length - 1].id;
		} else {
			return 0;
		}
	}

	async removeRecipeById(id: number) {
		const alert = await this.alertController.create({
			header: 'Delete',
			message: 'Are you sure you want to delete this recipe from your list?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Canceled');
					}
				}, {
					text: 'Yes',
					handler: () => {
						const index = this.recipes.indexOf(this.recipes.find(x => x.id === id));
						this.recipes.splice(index, 1);
						this.updateStorage();
						this.router.navigateByUrl('/recipes');
					}
				}
			]
		});

		await alert.present();
	}

}
