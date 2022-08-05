import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './common-modules/ng-material.module';
import { NavComponent } from './static-components/nav/nav.component';
import { NotFoundComponent } from './static-components/not-found/not-found.component';
import { ServerErrorComponent } from './static-components/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
