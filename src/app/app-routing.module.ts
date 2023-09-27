import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/errors/not-found.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { ForbiddenComponent } from "./components/errors/forbidden.component";

const appRoutes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'protected-page', component: MainPageComponent, canActivate: [AuthGuardService]},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'error', component: NotFoundComponent},
  { path: '**', redirectTo: '/error'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
