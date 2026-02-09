import { ChangeDetectorRef, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { FlightService } from '../../services/flight-service';
import { FlightInfo } from '../../models/flight-info';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog';
import { UtilityService } from '../../services/utility-service';

@Component({
  selector: 'app-flight-info-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatSelect,
    MatOption,
    MatProgressSpinner,
  ],
  templateUrl: './flight-info-form.html',
  styleUrl: './flight-info-form.css',
})
export class FlightInfoForm {
  airLineForm: FormGroup;
  numbers: number[] = new Array(10).fill(0).map((x, i) => i + 1);
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private utilityService: UtilityService,
  ) {
    this.airLineForm = this.formBuilder.group({
      airline: ['', [Validators.required]],
      arrivalDate: [, [Validators.required]],
      arrivalTime: [, [Validators.required]],
      flightNumber: ['', [Validators.required]],
      numOfGuests: ['', [Validators.required]],
      comments: [''],
    });
    this.isLoading = false;
  }

  onAirLineFormSubmit() {
    this.isLoading = true;
    this.cdr.detectChanges();
    const flightInfoDTO: FlightInfo = this.flightService.convertToFlightDTO(this.airLineForm);
    this.flightService.sendFlightDetails(flightInfoDTO).subscribe({
      next: (data) => {
        this.isLoading = false;
        
        this.dialog.open(Dialog, {
          data: this.utilityService.getdialogDataObject(
            'Success!',
            'Information Sent Successfully!',
          ),
        });
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.dialog.open(Dialog, {
          data: this.utilityService.getdialogDataObject(
            'Failur!',
            'Unable to send information! Please try again.',
          ),
        });
        this.cdr.detectChanges();
      },
    });
  }

  resetForm() {
    this.airLineForm.reset();
    Object.keys(this.airLineForm.controls).forEach((key) => {
      this.airLineForm.get(key)?.setErrors(null);
    });
  }
}
