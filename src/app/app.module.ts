import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderToolbarComponent,
        HttpClientModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule { }
