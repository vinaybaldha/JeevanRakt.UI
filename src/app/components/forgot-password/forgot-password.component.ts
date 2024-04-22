import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AccountService) {}

  onSubmit(): void {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        console.log('Password reset email sent successfully.', response);
        // Optionally, display a success message to the user
      },
      (error) => {
        console.error('Error sending password reset email:', error);
        // Handle error, display error message to the user, etc.
      }
    );
  }
}
