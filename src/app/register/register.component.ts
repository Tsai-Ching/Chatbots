import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterEntity } from './entity/register.entity';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {MessageModule} from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { GoogleSigninButtonModule, SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CheckboxModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    ButtonModule,
    MessageModule,
    CommonModule,
    DividerModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  authService  =  inject(AuthService);
  router = inject(Router);
  socialAuthService = inject(SocialAuthService);

  registerData: RegisterEntity = new RegisterEntity();
  @ViewChild('form', { static: false }) form!: NgForm;
  isRegisterFailed: boolean = false;
  errorMessage: string = "";

  user: SocialUser = new SocialUser();
  loggedInWithGoogle: boolean = false;

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);

      this.user = user;
      this.loggedInWithGoogle = (user != null);
      console.log(this.loggedInWithGoogle);
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.register(this.form.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.isRegisterFailed = false;
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
            this.isRegisterFailed = true;
            this.errorMessage = err.error.detail;
          }
        });
    }
  }

  //TODO: 創建帳號錯誤訊息提示
}
