import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private loginService : LoginService) {}

  canActivate (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLogged =  true

    this.loginService.isLoggedIn().then(isLoggedIn => {
      isLogged = isLoggedIn
    });

      if (isLogged) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  
  

