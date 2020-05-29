import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDashboardComponent } from './Products/products-dashboard/products-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'products-view', pathMatch: 'full'},
  {path: 'products-view', component: ProductsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
