import { ShortenTitlePipe } from 'src/app/app-shared/pipes/shorten-title.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
      ShortenTitlePipe
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
    ],
    exports: [
      CommonModule,
      ShortenTitlePipe,
      FlexLayoutModule,
    ]
  })

export class AppSharedModule { }
