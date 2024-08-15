import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResponseAuth, UserData } from '../models/userData.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  devUrl: string = environment.apiUrl;
  authUrl: string = this.devUrl + '/auth';

  user = new BehaviorSubject<UserData | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  message = new BehaviorSubject('');

  constructor() {
    const userData = localStorage.getItem('user');
    this.isLoggedIn$.next(!!localStorage.getItem('token'));

    if (userData) {
      const parseUserData = JSON.parse(userData);
      this.user.next(parseUserData);
    }
  }
  getIsLoggedIn() {
    return this.isLoggedIn$.value;
  }
  checkIsLogged() {
    this.http
      .get<{ message: string; userData: UserData }>(`${this.authUrl}/profile`)
      .subscribe(
        (response) => {
          this.message.next(response.message);
          this.isLoggedIn$.next(true);
          this.router.navigate(['/profile']);
          console.log(response.message);
        },
        (error) => {
          this.isLoggedIn$.next(false);
          this.router.navigate(['/sign-in']);
          console.error('Error checking login status:', error);
        }
      );
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      console.log('Token is not exist.');
      return null;
    }
  }

  signIn(userData: UserData) {
    if (userData) {
      this.http
        .post<ResponseAuth>(`${this.authUrl}/sign-in`, userData)
        .subscribe(
          (response) => {
            const userData = {
              name: response.userData.name,
              email: response.userData.email,
              password: response.userData.password,
            };
            this.settingAuthData(userData, response.token);

            this.router.navigate(['/profile']);
          },
          (error) => {
            console.log(error);
            this.router.navigate(['/sign-in']);
          }
        );
    } else {
      console.log('FormData is not exist.');
    }
  }

  signUp(userData: UserData) {
    if (userData) {
      this.http
        .post<ResponseAuth>(`${this.authUrl}/sign-up`, userData)
        .subscribe(
          (response: any) => {
            this.settingAuthData(userData, response.token);
            this.router.navigate(['/diary']);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('FormData is not exist.');
    }
  }
  settingAuthData(userData: UserData, token: string) {
    this.isLoggedIn$.next(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.user.next({ ...userData });
  }

  logout() {
    this.user.next(null);
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }
}
