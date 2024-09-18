import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutService } from '../../layout/service/app.layout.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LoginEntity } from './entity/login-entity';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, PasswordModule, FormsModule, RippleModule, ButtonModule, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  authService = inject(AuthService);
  router = inject(Router);
  loginData: LoginEntity = new LoginEntity();
  @ViewChild('form', { static: false }) loginForm!: NgForm;
  googleLoginUrl: string = '';
  isLoginFailed: boolean = false;
  errorMessage: string = "";

  constructor(public layoutService: LayoutService) { }

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

  onSubmit(){
    if(this.loginForm.valid){

      this.authService.login(this.loginData)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.isLoginFailed = true;
          this.errorMessage = err.error.detail;
        }
      });
    }
  }
}
