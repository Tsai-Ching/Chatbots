import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { TopbarComponent } from '../../topbar/topbar.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, TabMenuModule, ButtonModule, RippleModule, CommonModule, DividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);
  items: MenuItem[] = [
    { label: 'Chatbots', routerLink: '/dashboard/chatbots' },
    {
      label: 'Settings', routerLink: '/dashboard/create-chatbot'
    },
  ];

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
