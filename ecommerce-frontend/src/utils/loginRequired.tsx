// components/LoginRequired.tsx
'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginRequired() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) { // Corrigido: agora verifica se NÃO está autenticado
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md border border-[#375D8A]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2 text-[#274E61]">
              <Lock className="h-6 w-6" />
              Acesso restrito
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-muted-foreground">
              Você precisa estar logado para acessar este conteúdo.
            </p>
            <Button
              asChild
              className="w-full bg-[#375D8A] hover:bg-[#274E61] text-white"
            >
              <Link href="/signin">
                Conectar-se
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null; 
}