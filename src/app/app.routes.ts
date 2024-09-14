import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ChatbotManagementComponent } from './chatbot-management/chatbot-management.component';
import { CreateChatbotComponent } from './create-chatbot/create-chatbot.component';
import { ChatbotsComponent } from './chatbots/chatbots.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { OAuthCallbackComponent } from './o-auth-callback/o-auth-callback.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'chatbots', pathMatch: 'full' },
      {
        path: 'chatbots',
        component: ChatbotsComponent,
        pathMatch: 'full',
        // children: [
        //   {path: 'chatbot', component: ChatbotComponent}
        // ]
      },
      {
        path: 'chatbots/chatbot',
        component: ChatbotComponent
      },
      { path: 'create-chatbot/:id', component: CreateChatbotComponent },

    ]
  },
  { path: 'account', component: AccountComponent },
  { path: 'password-reset', component: ResetPwdComponent },
  { path: 'oauth-callback', component: OAuthCallbackComponent },
];
