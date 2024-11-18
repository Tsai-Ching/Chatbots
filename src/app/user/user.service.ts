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
        chatbot_id: "96dcd335-837f-408d-a346-01c1946021eb"
      },
      { withCredentials: true }
    )
  }
}
