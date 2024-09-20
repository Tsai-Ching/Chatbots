import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [InputTextModule, CardModule, ButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  updateEmail() {

  }

  deleteUser() {

  }
  updateUser() {

  }
}
