import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-forget-pwd',
  standalone: true,
  imports: [FormsModule, RouterModule, InputTextModule, ButtonModule, RippleModule],
  templateUrl: './forget-pwd.component.html',
  styleUrl: './forget-pwd.component.scss'
})
export class ForgetPwdComponent {
  authService = inject(AuthService);
  email: string = '';

  getResetEmail() {

    this.authService.getResetEmail(this.email).subscribe({
      next: (response) => {
        console.log('請求成功', response);
      },
      error: (error) => {
        console.error('請求失敗', error);
      },
    });;
  }
}
