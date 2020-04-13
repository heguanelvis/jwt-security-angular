import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { RoleGuardService } from "./services/auth/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: "ROLE_ADMIN"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
