import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  onSubmit(loginForm: FormGroup): void {
    console.log(this.loginForm.value);
    this.auth.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
