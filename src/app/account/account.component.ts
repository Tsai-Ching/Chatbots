import { Component, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [InputTextModule, CardModule, ButtonModule, TopbarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  id: string = '';
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getId().subscribe(id => this.id = id);
    console.log(this.id);
  }

  updateEmail() {

  }

  deleteUser() {

  }
  updateUser() {

  }
}
