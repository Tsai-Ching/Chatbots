import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TopbarComponent } from '../../topbar/topbar.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, TabMenuModule, ButtonModule, RippleModule, CommonModule, DividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  showDashboardMenu: boolean = false;
  items: MenuItem[] = [
    { label: 'Chatbots', routerLink: '/dashboard/chatbots' },
    {
      label: 'Settings', routerLink: '/dashboard/create-chatbot'
    },
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;
        // 遍歷子路由，取得最深層的路由數據
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        // 獲取最深層路由的 data
        this.showDashboardMenu = currentRoute.snapshot.data['showDashboardMenu'] ?? false;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
