import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPwdComponent } from "./reset-pwd/reset-pwd.component";
import { ForgetPwdComponent } from "./forget-pwd/forget-pwd.component";
import { OAuthCallbackComponent } from "./o-auth-callback/o-auth-callback.component";

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset_password', component: ResetPwdComponent },
  { path: 'forget_password', component: ForgetPwdComponent },
  { path: 'oauth-callback', component: OAuthCallbackComponent },
]
