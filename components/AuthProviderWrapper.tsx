import { cookies } from 'next/headers';
import { AuthProvider } from '@/context/AuthContext';
import jwt from 'jsonwebtoken';

const AuthProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const accessToken = cookies().get('accessToken')?.value;

  let user = null;
  if (accessToken) {
    try {
      user = jwt.decode(accessToken) as jwt.JwtPayload;
    } catch (error) {
      console.error('Invalid access token', error);
    }
  }

  return (
    <AuthProvider initialUser={user}>
      {children}
    </AuthProvider>
  );
};

export default AuthProviderWrapper;
