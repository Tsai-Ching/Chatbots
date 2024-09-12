import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-o-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './o-auth-callback.component.html',
  styleUrl: './o-auth-callback.component.scss'
})
export class OAuthCallbackComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectToLogin(params).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error handling OAuth:', err);
          this.router.navigate(['/login']);
        }
      });
    });
  }

  redirectToLogin(query: Params) {
    console.log('呼叫服務');
    return this.authService.redirectToLogin(query);
  }
}
