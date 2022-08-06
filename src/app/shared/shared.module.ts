import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgMaterialModule } from '../common-modules/ng-material.module';
import { AddToCartComponent } from './components/app-add-to-cart/add-to-cart.component';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';

const EXPORTED_DECLARATIONS = [ShortenTitlePipe, AddToCartComponent];

@NgModule({
    declarations: [EXPORTED_DECLARATIONS],
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgMaterialModule,
    ],
    exports: [
      EXPORTED_DECLARATIONS,
      CommonModule,
      FlexLayoutModule,
    ]
  })

export class SharedModule { }
