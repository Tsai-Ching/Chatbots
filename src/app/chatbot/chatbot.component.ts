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
import { ActivatedRoute } from '@angular/router';

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
  message: string = ''; // 綁定輸入框
  chatMessages: any[] = []; // 聊天消息列表
  route = inject(ActivatedRoute);
  robotId: string = '';

  ngOnInit(): void {
    // 讀取路由參數中的 id
    this.robotId = this.route.snapshot.paramMap.get('id')!;
  }

// 發送消息並接收回應
sentMsg() {
  if (this.message.trim() === '') {
    return; // 不發送空消息
  }

  // 將輸入的消息添加到聊天窗口
  this.chatMessages.push({ content: this.message, isUser: true });

  // 通過 API 發送消息
  this.chatbotService.sendMessage(this.robotId, this.message).subscribe(
    (response) => {
      // 接收機器人的回應，並顯示在聊天窗口
      this.chatMessages.push({ content: response, isUser: false });
      console.log('回應:', response);
    },
    (error) => {
      console.error('發送消息失敗:', error);
    }
  );

  // 清空輸入框
  this.message = '';
}
}
