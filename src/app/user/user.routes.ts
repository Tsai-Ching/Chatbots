import { Routes } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { ChatbotsComponent } from "./chatbots/chatbots.component";
import { CreateChatbotComponent } from "./create-chatbot/create-chatbot.component";
import { SourceComponent } from "../chatbot/source/source.component";

export const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: 'chatbots',
    pathMatch: 'full'
  },
  {
    path: '',
    // canActivate: [authGuard],
    children: [
      { path: 'chatbots', component: ChatbotsComponent },
      { path: 'create-chatbot/:id', component: SourceComponent },
      {
        path: 'chatbot/:id',
        loadChildren: () =>
          import('../chatbot/chatbot.route').then(m =>
            m.ChatbotRoutes)
      }
    ]
  },
];
