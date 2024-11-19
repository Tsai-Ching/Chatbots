import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChatbotConfig } from '../../user/create-chatbot/entity/chatbt-entity';
import { Observable } from 'rxjs';
import { Chatbot } from '../../user/chatbots/entity/chatbot.entity';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  #httpClient = inject(HttpClient)
  baseUrl = 'https://chatsource-api.onrender.com';


  constructor() { }

  sendMessage(robotId: string, message: string): Observable<any> {
    const requestBody = {
      chatbot_id: robotId, // 假設這個是機器人的 id
      content: message
    };

    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/chatbots/query`, requestBody, {
      withCredentials: true, // 開啟 withCredentials 以攜帶 Cookie
    });
  }

  getChatbots(): Observable<Chatbot[]> {
    return this.#httpClient.get<Chatbot[]>(`${this.baseUrl}/api/v1/chatbots/list`, {
      withCredentials: true
    });
  }
}
