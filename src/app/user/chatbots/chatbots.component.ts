import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../../topbar/topbar.component';
import { ChatbotService } from '../../chatbot/playground/chatbot.service';
import { Chatbot } from './entity/chatbot.entity';

@Component({
  selector: 'app-chatbots',
  standalone: true,
  imports: [DividerModule, RouterModule, TabMenuModule, ButtonModule, TopbarComponent],
  templateUrl: './chatbots.component.html',
  styleUrl: './chatbots.component.scss'
})
export class ChatbotsComponent implements OnInit {
  chatbotService = inject(ChatbotService);
  router = inject(Router);
  items: MenuItem[] = [
    { label: 'Chatbots' },
    { label: 'Settings' },
  ];
  chatbots: Chatbot[] = [];

  ngOnInit(): void {
    this.chatbotService.getChatbots().subscribe((chatbots: Chatbot[]) => {
      this.chatbots = chatbots;
      console.log(chatbots);

    });
  }

  onCreateBot() {
    this.chatbotService.createChatBot().subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate([`dashboard`, data.id, `source`]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
