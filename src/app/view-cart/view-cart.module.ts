import { NgModule } from "@angular/core";
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { SharedModule } from '../shared/shared.module';
import { ViewCartComponent } from './components/app-view-cart/view-cart.component';

const EXPORTABLE_DECLARATIONS = [ViewCartComponent];
@NgModule({
  declarations: [EXPORTABLE_DECLARATIONS],
  imports: [NgMaterialModule, SharedModule],
  exports: [EXPORTABLE_DECLARATIONS],
})
export class ViewCartModule {}
