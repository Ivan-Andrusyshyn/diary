import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { ResponseAuth, UserData } from '../models/userData.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  devUrl: string = environment.apiUrl;
  authUrl: string = this.devUrl + '/auth';

  private user = new BehaviorSubject<UserData | null>(null);
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  user$ = this.user.asObservable();

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
    return this.isLoggedIn$;
  }
  checkIsLogged() {
    this.http
      .get<{ message: string; userData: UserData }>(`${this.authUrl}/profile`)
      .subscribe(
        (response) => {
          this.message.next(response.message);
          this.isLoggedIn$.next(true);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.isLoggedIn$.next(false);
          this.router.navigate(['/sign-in']);
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

  userUpdate(userData: UserData) {
    const userId = this.user.value?._id;
    if (!userId) {
      console.log('id is not exist.');
      return;
    }

    if (userData) {
      this.http
        .post<ResponseAuth>(`${this.authUrl}/user/${userId}`, userData)
        .subscribe(
          (response) => {
            console.log('User updated successfully:', response);
            this.user.next(response.userData);
            localStorage.setItem('user', JSON.stringify(response.userData));
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('Can not update user data.');
    }
  }

  signIn(userData: UserData) {
    if (userData) {
      this.http
        .post<ResponseAuth>(`${this.authUrl}/sign-in`, userData)
        .subscribe(
          (response) => {
            const userData = {
              _id: response.userData._id,
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
          (response) => {
            this.settingAuthData(response.userData, response.token);
            this.router.navigate(['/diary/create-post']);
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
