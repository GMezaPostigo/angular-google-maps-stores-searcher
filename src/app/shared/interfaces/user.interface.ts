export interface IUser {
  token?: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}
