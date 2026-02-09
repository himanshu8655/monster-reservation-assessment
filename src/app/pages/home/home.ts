import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FlightInfoForm } from '../../forms/flight-info-form/flight-info-form';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    FlightInfoForm,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [provideNativeDateAdapter()],
})
export class Home {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
