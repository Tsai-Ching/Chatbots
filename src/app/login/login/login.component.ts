import { Component, Inject, ViewChild, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutService } from '../../layout/service/app.layout.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LoginEntity } from './entity/login-entity';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, PasswordModule, FormsModule, RippleModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService  =  inject(AuthService);
  router = inject(Router);
  loginData: LoginEntity = new LoginEntity();
  @ViewChild('form', { static: false }) loginForm!: NgForm;

  constructor(public layoutService: LayoutService) { }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginData);
      this.authService.login(this.loginData)
      .subscribe((data: any) => {
        if(this.authService.isLoggedIn()){
          this.router.navigate(['/dashboard']);
        }
        console.log(data);
      });
    }
  }
}
