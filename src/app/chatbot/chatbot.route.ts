import { Routes } from "@angular/router";
import { ChatbotComponent } from "./playground/chatbot.component";
import { SourceComponent } from "./source/source.component";
import { ChatbotSettingComponent } from "./chatbot-setting/chatbot-setting.component";


export const ChatbotRoutes: Routes = [
  { path: 'playground', component: ChatbotComponent },
  { path: 'source/:id', component: SourceComponent },
  { path: 'chatbot-setting', component: ChatbotSettingComponent }
];
