import { ChangeDetectorRef, Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth-service';
import { PasswordInput } from '../../shared/password-input/password-input';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog';
import { DialogData } from '../../models/dialog-data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UtilityService } from '../../services/utility-service';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    PasswordInput,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  signUpForm: FormGroup;
  hide = signal(true);
  isSignIn: boolean = false;
  @Output() toggleSignUpPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private utilityService: UtilityService,
  ) {
    this.authService = authService;
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signUp() {
    if (this.signUpForm.invalid) {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key)?.markAsTouched();
      });
      return;
    }
    const email = this.signUpForm.get('email')?.value;
    const pwd = this.signUpForm.get('password')?.value;
    this.isLoading = true;
    this.cdr.detectChanges();
    this.authService.signup(email, pwd).then(
      (data) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.dialog.open(Dialog, {
          data: this.utilityService.getdialogDataObject('Success', 'Sign Up Successful!'),
        });
        this.toggleSignUpPage.emit(false);
      },
      (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        let dialogData: DialogData = this.utilityService.getdialogDataObject(
          'Registration Failed',
          'Please try again!',
        );

        if (err.code === 'auth/email-already-in-use') dialogData.subTitle = 'Email already in use, Please try again!';
        else if (err.code === 'auth/invalid-email') dialogData.subTitle = 'Invalid Email, Please try again!';

        this.dialog.open(Dialog, { data: dialogData });
      },
    );
  }
}
