import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.logout();
      return false;
    }

    return true;
  }
}
