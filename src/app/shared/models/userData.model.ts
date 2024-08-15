export interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface UserDataWithToken {
  userData: UserData;
  token: string;
}

export interface ResponseAuth {
  message: string;
  userData: UserData;
  token: string;
}
