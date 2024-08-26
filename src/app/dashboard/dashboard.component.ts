import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService)
  router = inject(Router);
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
