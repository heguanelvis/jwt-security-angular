import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem("token");
    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (
      !this.auth.isAuthenticated() ||
      !tokenPayload.authorities.includes(expectedRole)
    ) {
      this.auth.logout();
      return false;
    }

    return true;
  }
}
