'use client';
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LoginRequiredProps {
  title?: string;
  message?: string;
}

export const LoginRequired = ({
  title = 'Área Restrita',
  message = 'Você precisa estar logado para acessar este conteúdo.',
}: LoginRequiredProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-dark mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/signin">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
            Fazer Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" className="px-6 py-3 rounded-md">
            Criar Conta
          </Button>
        </Link>
      </div>
    </div>
  );
};