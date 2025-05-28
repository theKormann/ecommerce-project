// components/LogoutButton.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth-slice';

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className = 'font-medium text-custom-sm text-[#274766] hover:text-[#375d8a]',
  children = 'Sair'
}: LogoutButtonProps) {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogout = async () => {
    if (!isMounted) return;
    
    try {
      // 1. Despacha a ação de logout
      dispatch(logout());
      
      // 2. Limpeza completa do armazenamento
      ['auth', 'persist:root'].forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // 3. Redirecionamento seguro
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    } catch (error) {
      console.error('Falha no logout:', error);
    }
  };

  if (!isMounted) {
    return (
      <button className={className} disabled>
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className={className}
      aria-label="Sair da conta"
    >
      {children}
    </button>
  );
}