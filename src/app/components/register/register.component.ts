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
  usernameAvailable: boolean = false;
  emailAvailable: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(64)]],
      email: ["", [Validators.required, Validators.email]],
      confirmEmail: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(signupForm: FormGroup): void {
    if (signupForm.valid && this.emailsMatch && this.passwordsMatch) {
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
    } else {
      alert("Form errors...try again!");
    }
  }

  checkUsername() {
    this.auth
      .checkUsername(this.username.value)
      .subscribe(
        response => (this.usernameAvailable = response.usernameAvailable)
      );
  }

  checkEmail() {
    this.auth
      .checkEmail(this.email.value)
      .subscribe(response => (this.emailAvailable = response.emailAvailable));
  }

  get username() {
    return this.signupForm.get("username");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get emailsMatch() {
    return (
      this.signupForm.get("email").value ===
      this.signupForm.get("confirmEmail").value
    );
  }

  get passwordsMatch() {
    return (
      this.signupForm.get("password").value ===
      this.signupForm.get("confirmPassword").value
    );
  }
}
