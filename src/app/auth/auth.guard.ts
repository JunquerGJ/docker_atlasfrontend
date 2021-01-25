import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = sessionStorage.getItem("token")
    if (!token) {
      console.log("no1")
      this.router.navigate(["/login"])
      return false
    } else {
      let content = atob(token.split(".")[1])
      var jsonObj = JSON.parse(content)
      var expirationDate = new Date(jsonObj.exp * 1000)
      var now = new Date()
      console.log(expirationDate)
      console.log(now)
      console.log(expirationDate > now)
      console.log("beeee")
      if(expirationDate <= now){
        console.log("NO2")
        this.router.navigate(["/login"])
        return false
      }
      console.log("pase")
      return true
    }
  }
}
