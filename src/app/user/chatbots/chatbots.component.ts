import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../../topbar/topbar.component';
import { ChatbotService } from '../../chatbot/playground/chatbot.service';
import { Chatbot } from './entity/chatbot.entity';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chatbots',
  standalone: true,
  imports: [DividerModule, RouterModule, TabMenuModule, ButtonModule, TopbarComponent],
  templateUrl: './chatbots.component.html',
  styleUrl: './chatbots.component.scss'
})
export class ChatbotsComponent implements OnInit {
  chatbotService = inject(ChatbotService);
  userService = inject(UserService);
  router = inject(Router);
  chatbots: Chatbot[] = [];

  ngOnInit(): void {
    this.chatbotService.getChatbots().subscribe((chatbots: Chatbot[]) => {
      this.chatbots = chatbots;
      console.log(chatbots);

    });
  }

  onCreateBot() {
    this.userService.createChatBot().subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate([`dashboard`, `create-chatbot`, data.id]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
