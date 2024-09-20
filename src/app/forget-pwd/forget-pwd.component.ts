import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-forget-pwd',
  standalone: true,
  imports: [FormsModule, RouterModule, InputTextModule, ButtonModule, RippleModule, ProgressSpinnerModule],
  templateUrl: './forget-pwd.component.html',
  styleUrl: './forget-pwd.component.scss'
})
export class ForgetPwdComponent {
  authService = inject(AuthService);
  email: string = '';
  isSent: boolean = false;
  isLoading: boolean = false;

  getResetEmail() {
    this.isLoading = true;
    this.authService.getResetEmail(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSent = true;
        console.log('請求成功', response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('請求失敗', error);
      },
    });;
  }
}
