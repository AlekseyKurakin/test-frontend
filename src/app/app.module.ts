import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalModule } from "./components/modal/modal.module";
import { NotFoundComponent } from './components/errors/not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { MainPageComponent } from './components/main-page/main-page.component';
import {StoreModule} from "@ngrx/store";
import { metaReducers, reducers } from "./store";
import { AuthGuardService } from "./services/auth-guard.service";
import { ForbiddenComponent } from './components/errors/forbidden.component';
import { UsersService } from "./services/users.service";
import { UsersEffects } from "./store/users/users.effects";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    NotFoundComponent,
    MainPageComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      UsersEffects,
    ]),
  ],
  providers: [
    AuthGuardService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
