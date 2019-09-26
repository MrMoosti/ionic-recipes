import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Recipe } from '../recipe';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    private recipeName: string;
    private recipeUrl: string;
    private recipeIngredients: string[];
    private recipeInstructions: string[];

    private ingredientInput: string;
    private instructionInput: string;

    constructor(private rs: RecipesService, private router: Router, private alertController: AlertController, public toastController: ToastController) { }

    ngOnInit() {
        this.recipeIngredients = [];
        this.recipeInstructions = [];
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
            header: 'Confirm',
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
            header: 'Confirm',
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
    async addRecipe() {
        if (!this.recipeName) {
            this.showToast("Please, fill in a valid recipe name");
        } else if (!this.recipeUrl) {
            this.showToast("Please, fill in a valid image url");
        } else if (this.recipeIngredients.length <= 0) {
            this.showToast("Please, add some ingredients.");
        } else if (this.recipeInstructions.length <= 0) {
            this.showToast("Please, add some instructions.");
        } else {
            let recipe = new Recipe();
            recipe.id = this.rs.getLastRecipeId() + 1;
            recipe.name = this.recipeName;
            recipe.imageUrl = this.recipeUrl;
            recipe.ingredients = this.recipeIngredients;
            recipe.instructions = this.recipeInstructions;
            this.rs.addNewRecipe(recipe);
            this.showToast("Your recipe has been added to your list.");
            this.router.navigateByUrl('/recipes');
        }
    }

    // Cancel recipe
    async cancel() {
        const alert = await this.alertController.create({
            header: 'Confirm',
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

                        this.router.navigateByUrl('/recipes');
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
