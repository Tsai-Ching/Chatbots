import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ChatbotService } from '../chatbot.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-chatbot',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './create-chatbot.component.html',
  styleUrl: './create-chatbot.component.scss'
})
export class CreateChatbotComponent {
  items: MenuItem[] | undefined;
  chatbotService  =  inject(ChatbotService);
  router = inject(Router);

  ngOnInit() {
      this.items = [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Search', icon: 'pi pi-search' }
      ];
  }

  onCreate() {
    this.chatbotService.createChatBot().subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate([`dashboard/chatbot`, data.id]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
