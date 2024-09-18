import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterEntity } from './entity/register.entity';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import {MessageModule} from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { passwordValidator } from '../Validator';

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
    RouterModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  authService  =  inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup;
  registerData: RegisterEntity = new RegisterEntity();

  isRegisterFailed: boolean = false;
  errorMessage: string = "";
  googleLoginUrl: string = '';

  constructor(public layoutService: LayoutService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(9), passwordValidator()]),
    });
  }

  ngOnInit(): void {
    this.authService.getGoogleLoginUrl().subscribe({
      next: (data: any) => {
        console.log(data.authorization_url);
        this.googleLoginUrl = data.authorization_url;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value)
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
