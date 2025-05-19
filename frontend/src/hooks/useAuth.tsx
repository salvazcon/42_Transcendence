import { useContext } from 'react';
import { AuthContext } from '@/context/Auth/AuthContext';
import { AuthContextType } from '@/types/authContext';

export const useAuth = (): AuthContextType => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
	return ctx;
  };