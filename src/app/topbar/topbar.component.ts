import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, CommonModule, MenuModule, ButtonModule, RippleModule, AvatarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  ngOnInit(): void {
    this.menuItems = [
      {
        separator: true
      },
      {
        label: 'Dashboard',
        routerLink: ['/dashboard/chatbots'],
      },
      {
        label: 'Account Settings',
        routerLink: ['/account'],
      },
      {
        label: 'Create or join team'
      },
      {
        separator: true
      },
      {
        label: 'Sign out',
        routerLink: ['/auth/login'],
      },
    ];

  }
}
