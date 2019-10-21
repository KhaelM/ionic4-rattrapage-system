import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService
  ) {}

  canActivate() {
    return this.authService.isAuthenticated();
  }

}
