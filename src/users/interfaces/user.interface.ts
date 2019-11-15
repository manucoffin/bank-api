export interface IUser {
  id: number;
  pin: number;
  username: string;
  firstname: string;
  lastname: string;
  genre: string;
  birthdate: string;
  address: string;
  balance: number;
  accountNumber: string;
}

export interface IUserCredentials {
  accountNumber: string;
  pin: number;
}
