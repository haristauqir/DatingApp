import { Injectable } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  users: User[];
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data....!!');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
