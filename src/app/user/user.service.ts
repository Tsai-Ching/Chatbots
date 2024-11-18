import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  #httpClient = inject(HttpClient);
  baseUrl = 'https://chatsource-api.onrender.com';
  feedText(text: string) {
    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/chatbots/train`,
      {
        title: "123",
        content: text,
        chatbot_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }
}
