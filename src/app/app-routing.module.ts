import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableRoutes } from './shared/enums/available-routes';
import { LoginGuard } from './shared/guards/login.guard';
import { NotFoundComponent } from './static-components/not-found/not-found.component';
import { ServerErrorComponent } from './static-components/server-error/server-error.component';

const routes: Routes = [
  {
    path: AvailableRoutes.AllProducts,
    canActivate: [LoginGuard],
    loadChildren: () => import('./all-products/all-products.module').then(m => m.ProductsModule)
  },
  {
    path: AvailableRoutes.Product,
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: AvailableRoutes.Cart,
    canActivate: [LoginGuard],
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: AvailableRoutes.Auth,
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {path: '', redirectTo: AvailableRoutes.AllProducts, pathMatch: 'full'},
  {path: AvailableRoutes.ServerError, component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
