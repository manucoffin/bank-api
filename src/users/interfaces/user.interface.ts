export interface IUser {
  id: number;
  token: string;
  pin: number;
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  birthdate: string;
  address: string;
  balance: number;
  accountNumber: string;
}

export interface IUserCredentials {
  accountNumber: string;
  pin: number;
}
