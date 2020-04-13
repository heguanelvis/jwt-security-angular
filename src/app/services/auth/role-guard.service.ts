import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedAuthorities = route.data.expectedAuthorities;

    if (
      !this.auth.isAuthenticated() ||
      !this.auth.hasAuthorities(expectedAuthorities)
    ) {
      this.auth.logout();
      return false;
    }

    return true;
  }
}
