import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './static-components/not-found/not-found.component';
import { ServerErrorComponent } from './static-components/server-error/server-error.component';

const routes: Routes = [
  {path: 'all-products', loadChildren: () => import('./all-products/all-products.module').then(m => m.ProductsModule)},
  {path: 'product', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: '', redirectTo: 'all-products', pathMatch: 'full'},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
