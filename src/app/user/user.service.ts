import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  #httpClient = inject(HttpClient);
  baseUrl = 'https://chatsource-api.onrender.com';

  feedText(id: string, text: string) {
    return this.#httpClient.post<any>(`${this.baseUrl}/api/v1/chatbots/train`,
      {
        title: "123",
        content: text,
        chatbot_id: id
      },
      { withCredentials: true }
    )
  }
}
