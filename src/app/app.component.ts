import { Component } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  collapsed: boolean = true;

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.auth.hasAuthorities(["ROLE_ADMIN"]);
  }
}
