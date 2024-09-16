// chatbot.model.ts
export interface Chatbot {
  id: string;
  name: string;
  llm: string;
  temperature: number;
  instruction: string;
  members: {
    id: string;
    email: string;
    role: string;
  }[];
}
