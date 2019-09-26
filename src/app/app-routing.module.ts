import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppPage } from 'e2e/src/app.po';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes', children: [
      { path: '', loadChildren: './recipes/recipes.module#RecipesPageModule' },
      { path: 'add', loadChildren: './recipes/add/add.module#AddPageModule' },
      { path: ':recipe', loadChildren: './recipes/detail/detail.module#DetailPageModule' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
