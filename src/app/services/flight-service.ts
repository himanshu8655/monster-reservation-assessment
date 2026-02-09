import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightInfo } from '../models/flight-info';
import { environment } from '../../environments/environment';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private http = inject(HttpClient);

  sendFlightDetails(flightPayload: FlightInfo): Observable<any> {
    const headers = new HttpHeaders({
      'token': environment.token,
      'candidate': 'Himanshu Shivkumar Garg'
    })
    return this.http.post(`${environment.baseUrl}/flightInfoChallenge`, flightPayload, {headers});
  }

  convertToFlightDTO(flightForm: FormGroup): FlightInfo {
    const date: Date = flightForm.get('arrivalDate')?.value;
    const dateTime: Date = flightForm.get('arrivalTime')?.value;
    dateTime.setFullYear(date.getFullYear());
    dateTime.setMonth(date.getMonth());
    dateTime.setDate(date.getDate());

    const flightInfo: FlightInfo = {
      airline: flightForm.get('airline')?.value,
      arrivalDate: dateTime.toString(),
      arrivalTime: dateTime.toString(),
      flightNumber: flightForm.get('flightNumber')?.value,
      numOfGuests: flightForm.get('numOfGuests')?.value,
      comments: flightForm.get('comments')?.value || undefined,
    };

    return flightInfo;
  }
}
