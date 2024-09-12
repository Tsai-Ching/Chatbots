import { Component, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { passwordValidator } from '../Validator';

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [InputTextModule, ButtonModule, RippleModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.scss'
})
export class ResetPwdComponent implements OnInit {
  route = inject(ActivatedRoute)
  router = inject(Router);
  #authService = inject(AuthService);
  resetPwdFormFroup: FormGroup;

  constructor() {
    this.resetPwdFormFroup = new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(9), passwordValidator()]),
      //confirmPassword: new FormControl('', [Validators.required, Validators.minLength(9), passwordValidator()]),
    });
  }

  ngOnInit(): void {
    // if (!this.#authService.isLoggedIn()) {
    //   this.router.navigateByUrl('/login');
    // }
  }


  resetPassword() {
    if (this.resetPwdFormFroup.valid) {
      this.#authService.resetPassword(this.resetPwdFormFroup.value).subscribe(data => {
        this.router.navigateByUrl('/login');
      }, (error: any) => {
        console.log(error);
      });
    }
  }
}
