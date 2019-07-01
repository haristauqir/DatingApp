import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(): Promise<boolean> | boolean {
    if (this.authService.loggedin()) {
      return true;
    }

    this.alertify.error('You shall not pass!!');
    this.router.navigate(['/home']);
    return false;

  }
}
