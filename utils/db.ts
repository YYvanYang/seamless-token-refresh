import bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  passwordHash: string;
}

const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('password123', 10), // 示例密码
  },
];

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = users.find((user) => user.email === email);
  return user || null;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}
