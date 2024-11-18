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
    console.log('feedText');

    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/chatbots/train`,
      {
        title: "123",
        content: text,
        chatbot_id: "c572f65e-6438-40f1-80a1-704fe8d74ac1"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }
}
