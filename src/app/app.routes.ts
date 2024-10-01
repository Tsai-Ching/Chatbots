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
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { SettingPanelComponent } from './setting-panel/setting-panel.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';

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
        path: 'chatbot/:id',
        component: ChatbotComponent,
        children: [
          {
            path: '',
            component: SettingPanelComponent,
            children: [
              {
                path: 'settings',
                component: GeneralSettingComponent
              }
            ]
          }
        ]
      },
      { path: 'create-chatbot', component: CreateChatbotComponent },

    ]
  },
  { path: 'account', component: AccountComponent },
  { path: 'reset_password', component: ResetPwdComponent },
  { path: 'forget-password', component: ForgetPwdComponent },
  { path: 'oauth-callback', component: OAuthCallbackComponent },
];
