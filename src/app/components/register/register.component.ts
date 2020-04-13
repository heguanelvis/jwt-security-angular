import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    });
  }

  onSubmit(signupForm: FormGroup): void {
    console.log(signupForm.value);
    const {
      username,
      email,
      confirmEmail,
      password,
      confirmPassword
    } = signupForm.value;

    this.auth.register(
      username,
      email,
      confirmEmail,
      password,
      confirmPassword
    );
  }
}
