import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { app } from '../firebase/firebase';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseApp: FirebaseApp;
  private firebaseAuth: Auth;

  constructor(private router: Router) {
    this.firebaseApp = app;
    this.firebaseAuth = getAuth(this.firebaseApp);
  }

  isAuthenticated(): Promise<boolean> {
    const auth = getAuth();
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  logout() {
    this.firebaseAuth.signOut();
    this.router.navigate(['/']);
  }
}
