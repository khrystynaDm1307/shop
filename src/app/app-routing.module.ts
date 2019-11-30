import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'main', component: MainComponent},
  // {path: 'pizza/:id', component: ProductDetailsComponent},
  // {path: 'admin', component: AdminComponent, children: [
  //   {path: '', redirectTo: 'category', pathMatch: 'full'},
  //   {path: 'category', component: AdminCategoryComponent},
  //   {path: 'products', component: AdminProductsComponent},
  //   {path: 'discount', component: AdminDiscountComponent},
  //   {path: 'orders', component: AdminOrdersComponent}
  // ]},
  {path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
