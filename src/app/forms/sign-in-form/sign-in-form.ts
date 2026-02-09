import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PasswordInput } from '../../shared/password-input/password-input';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog';
import { UtilityService } from '../../services/utility-service';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    PasswordInput,
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css',
})
export class SignInForm {
  signInForm: FormGroup;
  hide = signal(true);
  isSignIn: boolean = false;
  isLoading = false;
  @Output() toggleSignUpPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private utilityService: UtilityService,
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.utilityService.markFormTouched(this.signInForm);
      return;
    }
    const email = this.signInForm.get('email')?.value;
    const pwd = this.signInForm.get('password')?.value;

    this.authService.login(email, pwd).then(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.utilityService.resetForm(this.signInForm);
      },
      (err) => {
        this.isLoading = false;
        this.dialog.open(Dialog, {
          data: this.utilityService.getdialogDataObject('Login Failed', 'Incorrect Email or Password!'),
        });
      },
    );
  }
}
