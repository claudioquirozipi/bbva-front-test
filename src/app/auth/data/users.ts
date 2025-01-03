export interface User {
  email: string;
  password: string;
}

export const users: User[] = [
  {
    email: "admin@example.com",
    password: "123456",
  },
  {
    email: "claudio@example.com",
    password: "123456",
  },
];
