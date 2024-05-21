import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AccountService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  onSubmit(): void {
    const resetPasswordDTO = {
      token: this.token,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    this.authService.resetPassword(resetPasswordDTO).subscribe(
      (response) => {
        console.log('Password reset successfully.', response);
        // Optionally, display a success message to the user
      },
      (error) => {
        console.error('Error resetting password:', error);
        // Handle error, display error message to the user, etc.
      }
    );
  }
}
