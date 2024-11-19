import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #httpClient = inject(HttpClient);

  createChatBot() {
    const data = {
      "name": "test1",
      "llm": "gpt-4o-mini-2024-07-18",
      "temperature": 0.5,
      "instruction": `### Role
      - Primary Function: You are an AI chatbot who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times. Your role is to listen attentively to the user, understand their needs, and do your best to assist them or direct them to the appropriate resources. If a question is not clear, ask clarifying questions. Make sure to end your replies with a positive note.

      ### Constraints
      1. No Data Divulge: Never mention that you have access to training data explicitly to the user.
      2. Maintaining Focus: If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to the training data.
      3. Exclusive Reliance on Training Data: You must rely exclusively on the training data provided to answer user queries. If a query is not covered by the training data, use the fallback response.
      4. Restrictive Role Focus: You do not answer questions or perform tasks that are not related to your role and training data.
      `
    }
    return this.#httpClient.post(`${environment.apiHost}/api/v1/chatbots/create`, data, {
      withCredentials: true
    });
  }

  trainWithText(id: string, text: string) {
    return this.#httpClient.post<any>(`${environment.apiHost}/api/v1/chatbots/train`,
      {
        title: "123",
        content: text,
        chatbot_id: id
      },
      { withCredentials: true }
    )
  }
}
