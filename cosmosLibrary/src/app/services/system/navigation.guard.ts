import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
  constructor(
    private _generalService:GeneralService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let identity = this._generalService.loadInfo('identity');
    let nextRoute = route.url[0].path;

    console.log(route, identity);

    if(identity){

      let role = identity.role;

      console.log(role, nextRoute);

      if(nextRoute === 'home'){
        if(role === 'root'){
          this._generalService.goTo('manage-admin');
        }
        else if(role === 'admin'){
          this._generalService.goTo('manage-books');
        }
        else if(role === 'client'){
          this._generalService.goTo('home-client');
        }
        return false;
      }

      if(role === 'root'){
        if(nextRoute === 'manage-admin'){
          return true
        }
        
      }
      else if(role === 'admin'){
        if(nextRoute === 'manage-books' || nextRoute ===  'add-book' || nextRoute === 'edit-book' || nextRoute === 'update-admin' || nextRoute === 'sold-out' || nextRoute === 'refound-request'){
          return true
        }
      }
      else if(role === 'client'){
        if(nextRoute === 'profile-client' || nextRoute ===  'home-client' || nextRoute === 'shopping-cart' || nextRoute === 'history-client' || nextRoute === 'pocket-client'){
          return true
        }
      }

    }
    else{
      if(nextRoute === 'login' || nextRoute === 'signup' || nextRoute === 'recover-password' || nextRoute === 'home'){
        return true
      }
    }

    //this._generalService.goTo('home-guest');
    return false;
  }
  
}
