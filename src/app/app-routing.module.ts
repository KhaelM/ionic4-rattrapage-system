import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticationGuardService } from "./services/autentication-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AutenticationGuardService] 
  },
  { path: 'disconnect', loadChildren: './disconnect/disconnect.module#DisconnectPageModule' },
  { path: 'matieres', loadChildren: './matieres/matieres.module#MatieresPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
