import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [TabMenuModule, CommonModule, CardModule, ButtonModule, ToggleButtonModule, FormsModule, DividerModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  chatbotService  =  inject(ChatbotService);
  formVisible: boolean = false;
  items: MenuItem[] =[
    { label: 'Playground'},
    { label: 'Settings'},
  ];
  message: string = '';

  sentMsg() {

  }
}
