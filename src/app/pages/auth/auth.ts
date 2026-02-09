import {Component, signal} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SignInForm } from "../../forms/sign-in-form/sign-in-form";
import { SignUpForm } from "../../forms/sign-up-form/sign-up-form";

@Component({
  selector: 'app-auth',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, SignInForm, SignUpForm],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {


  isSignUp:boolean = false;

  onFormChangeEvent(val: boolean){
    this.isSignUp = val;
  }
}
