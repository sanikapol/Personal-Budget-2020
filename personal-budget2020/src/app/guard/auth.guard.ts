import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private tokenService:TokenService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log("Token auth guard: " + localStorage.getItem('Token'));
    const token = this.tokenService.getToken();
    if(token != null) return true;
    //if (localStorage.getItem('Token') != null) return true;
    this.router.navigate([ '/login' ]);
    return false;
  }

}
