import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../topbar/topbar.component';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbots',
  standalone: true,
  imports: [DividerModule, RouterModule, TabMenuModule, ButtonModule, TopbarComponent],
  templateUrl: './chatbots.component.html',
  styleUrl: './chatbots.component.scss'
})
export class ChatbotsComponent {
  chatbotService  =  inject(ChatbotService);
  router = inject(Router);
  items: MenuItem[] =[
    { label: 'Chatbots'},
    { label: 'Settings'},
  ];
}
