import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	private recipeName: string;
	private recipeUrl: string;
	private recipeIngredients: string[];
	private recipeInstructions: string[];

	private ingredientInput: string;
	private instructionInput: string;
	private recipe: Recipe;

	constructor(private route: ActivatedRoute, private rs: RecipesService, private router: Router, private alertController: AlertController, public toastController: ToastController) { }

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('recipe');
		this.recipe = this.rs.getRecipeById(parseInt(id, 10));

		this.recipeName = this.recipe.name;
		this.recipeUrl = this.recipe.imageUrl;
		this.recipeIngredients = this.recipe.ingredients;
		this.recipeInstructions = this.recipe.instructions;
	}

	// Ingredients
	async addIngredient() {
		if (this.ingredientInput) {
			this.recipeIngredients.push(this.ingredientInput);
			this.ingredientInput = "";
		} else {
			await this.showToast("You can't add an empty ingredient!");
		}
	}

	async removeIngredient(id: number) {
		const alert = await this.alertController.create({
			header: 'Delete',
			message: 'Are you sure you want to delete this ingredient?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log("Canceled");
					}
				},
				{
					text: 'Yes',
					handler: () => {
						if (id !== -1) {
							this.recipeIngredients.splice(id, 1);
						}
					}
				}
			]
		});

		await alert.present();
	}


	// Instructions
	async addInstruction() {
		if (this.instructionInput) {
			this.recipeInstructions.push(this.instructionInput);
			this.instructionInput = "";
		} else {
			await this.showToast("You can't add an empty instruction!");
		}
	}

	async removeInstruction(id: number) {
		const alert = await this.alertController.create({
			header: 'Delete',
			message: 'Are you sure you want to delete this instruction?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log("Canceled");
					}
				},
				{
					text: 'Yes',
					handler: () => {
						if (id !== -1) {
							this.recipeInstructions.splice(id, 1);
						}
					}
				}
			]
		});

		await alert.present();
	}

	// Add Recipe
	async saveChanges() {
		if (!this.recipeName) {
			this.showToast("Please, fill in a valid recipe name");
		} else if (!this.recipeUrl) {
			this.showToast("Please, fill in a valid image url");
		} else if (this.recipeIngredients.length <= 0) {
			this.showToast("Please, add some ingredients.");
		} else if (this.recipeInstructions.length <= 0) {
			this.showToast("Please, add some instructions.");
		} else {
			this.recipe.name = this.recipeName;
			this.recipe.imageUrl = this.recipeUrl;
			this.recipe.ingredients = this.recipeIngredients;
			this.recipe.instructions = this.recipeInstructions;
			this.rs.updateRecipe(this.recipe);
			this.showToast("Your recipe has been updated to your list.");
			this.router.navigateByUrl('/recipes/' + this.recipe.id);
		}
	}

	// Cancel recipe
	async cancel() {
		const alert = await this.alertController.create({
			header: 'Cancel',
			message: 'Are you sure you want to cancel your recipe? Unsaved data will get lost.',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log("Canceled");
					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.recipeName = "";
						this.recipeUrl = "";
						this.recipeIngredients = [];
						this.recipeInstructions = [];
						this.ingredientInput = "";
						this.instructionInput = "";

						this.router.navigateByUrl('/recipes/' + this.recipe.id);
					}
				}
			]
		});

		await alert.present();
	}

	async showToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});
		toast.present();
	}

}
