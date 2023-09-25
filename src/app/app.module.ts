import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserModalModule } from "./components/user-modal/user-modal.module";
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
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    NotFoundComponent,
    MainPageComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    UserModalModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      UsersEffects,
    ]),
  ],
  providers: [
    AuthGuardService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
