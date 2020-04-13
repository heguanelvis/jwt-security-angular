import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
    this.signupForm = this.formBuilder.group(
      {
        username: ["", [Validators.required, Validators.maxLength(64)]],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
      },
      { validators: [this.emailMatchValidator, this.passwordMatchValidator] }
    );
  }

  emailMatchValidator(signupForm: FormGroup) {
    return signupForm.controls["email"].value ===
      signupForm.controls["confirmEmail"].value
      ? null
      : { mismatch: true };
  }

  passwordMatchValidator(signupForm: FormGroup) {
    return signupForm.controls["password"].value ===
      signupForm.controls["confirmPassword"].value
      ? null
      : { mismatch: true };
  }

  onSubmit(signupForm: FormGroup): void {
    console.log(signupForm.value);
    console.log(signupForm);
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
