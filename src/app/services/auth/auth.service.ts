import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  public checkUsername(username: string) {
    return this.http.post<any>(`http://localhost:8080/api/checkusername`, {
      username
    });
  }

  public checkEmail(email: string) {
    return this.http.post<any>(`http://localhost:8080/api/checkemail`, {
      email
    });
  }

  public register(
    username: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http
      .post<any>(`http://localhost:8080/api/register`, {
        username,
        email,
        confirmEmail,
        password,
        confirmPassword
      })
      .subscribe(response => {
        alert(response.message);
      });
  }

  public login(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:8080/api/authenticate`, {
        username,
        password
      })
      .subscribe(
        response => {
          localStorage.setItem("token", response.jwt);
          this.router.navigate([""]);
        },
        error => {
          alert("Incorrect username or password!");
          throw error;
        }
      );
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    return !this.jwtHelper.isTokenExpired(token);
  }

  public hasAuthorities(expectedAuthorities: string[]): boolean {
    const token = localStorage.getItem("token");
    const tokenPayload = this.jwtHelper.decodeToken(token);

    let authorityChecker = (userAuthorities, expectedAuthorities) =>
      expectedAuthorities.every(authority =>
        userAuthorities.includes(authority)
      );

    return authorityChecker(tokenPayload.authorities, expectedAuthorities);
  }
}
