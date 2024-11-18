import { Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CreateChatbotComponent } from './user/create-chatbot/create-chatbot.component';
import { ChatbotsComponent } from './user/chatbots/chatbots.component';
import { SettingPanelComponent } from './chatbot/setting-panel/setting-panel.component';
import { ChatbotComponent } from './chatbot/playground/chatbot.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./user/user.routes').then(
        m => m.UserRoutes
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(
        m => m.AuthRoutes
      )
  },
  { path: 'account', component: AccountComponent },
  { path: 'oauth-callback', component: OAuthCallbackComponent }
];
