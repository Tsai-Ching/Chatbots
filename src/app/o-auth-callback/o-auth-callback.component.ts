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
      const query = this.route.snapshot.queryParams;
      this.authService.redirectToLogin(query).subscribe({
        next: (data: any) => {
          console.log(data);

          localStorage.setItem('token', data.access_token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error handling OAuth:', err);
          this.router.navigate(['/login']);
        }
      });
    });
  }

  redirectToLogin(query: Params) {
    this.authService.redirectToLogin(query);
  }
}