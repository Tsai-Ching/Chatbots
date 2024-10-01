import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-setting-panel',
  standalone: true,
  imports: [MenuModule, RouterModule ],
  templateUrl: './setting-panel.component.html',
  styleUrl: './setting-panel.component.scss'
})
export class SettingPanelComponent {
  items: MenuItem[] | undefined;
  router = inject(Router);
  route = inject (ActivatedRoute);
  // chatbotId: string = '';

  ngOnInit() {
    // this.route.parent!.params.subscribe(params => this.chatbotId = params['id'])
      this.items = [
          { label: 'Sources'},
          { label: 'Settings', routerLink: 'settings'}
      ];
  }

  // navigateTo() {
  //   this.router.navigate([`/chatbot/${this.chatbotId}/${path}`])
  // }
}
