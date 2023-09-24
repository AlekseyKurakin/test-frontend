export interface IUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  type: 'Admin' | 'Driver';
  password: string;
}
