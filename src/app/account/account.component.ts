import { Component, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [InputTextModule, CardModule, ButtonModule, TopbarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  email: string = '';
  password: string = '';
  authService = inject(AuthService);

  updateEmail() {
    this.authService.updateEmail(this.email);
  }

  updatePassword() {
    this.authService.updateEmail(this.password);
  }

  // deleteUser() {
  //   this.authService.deleteUser();
  // }
}
