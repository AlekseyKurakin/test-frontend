import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalModule } from "./components/modal/modal.module";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { MainPageComponent } from './components/main-page/main-page.component';
import {StoreModule} from "@ngrx/store";
import { metaReducers, reducers } from "./store";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    NotFoundComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
