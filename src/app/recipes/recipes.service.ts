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
    const Spaghetti = new Recipe();
    Spaghetti.id = 1;
    Spaghetti.name = 'Spaghetti';
    Spaghetti.imageUrl = 'https://static.ah.nl/static/recepten/img_085892_445x297_JPG.jpg';
    Spaghetti.ingredients = ['spaghetti', 'water', 'that good sauce'];
    Spaghetti.instructions = ['Put water in pot', 'Make water hot', 'put spaghet in', 'take spaghet out', 'put spaghet on bowl', 'take good sauce and put on spaghoot'];

    const Vodka = new Recipe();
    Vodka.id = 2;
    Vodka.name = 'Vodka';
    Vodka.imageUrl = 'https://images-na.ssl-images-amazon.com/images/I/41PLfPBoj2L.jpg';
    Vodka.ingredients = ['Potatoes', 'more Potatoes'];
    Vodka.instructions = ['Get up', 'Go to store', 'Don\'t buy potatoe', 'Buy Absolut Vodka', 'Get Drunk'];

    this.recipes.push(Spaghetti);
    this.recipes.push(Vodka);
  }

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find(x => x.id === id);
  }

  async removeRecipeById(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
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
            this.router.navigateByUrl('/recipes');
          }
        }
      ]
    });

    await alert.present();
  }

}
