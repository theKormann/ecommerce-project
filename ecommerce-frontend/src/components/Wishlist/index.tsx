'use client';
import React from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import SingleItem from './SingleItem';
import { LoginRequired } from '@/components/Auth/LoginRequired';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Wishlist = () => {
  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.auth);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin?redirect=/wishlist');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <>
        <Breadcrumb title={'Wishlist'} pages={['Wishlist']} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <LoginRequired 
              title="Acesso à Lista de Desejos" 
              message="Por favor, faça login para visualizar sua lista de desejos."
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb title={'Wishlist'} pages={['Wishlist']} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">
              Olá, {user?.nome.split(' ')[0]}! Sua Lista de Favoritos
            </h2>
            {wishlistItems.length > 0 && (
              <button className="text-blue hover:text-blue-dark transition-colors">
                Limpar Lista de Favoritos
              </button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-[10px] shadow-1 p-10 text-center">
              <h3 className="text-xl font-medium text-dark mb-4">
                Sua lista de desejos está vazia
              </h3>
              <p className="mb-6">
                Você ainda não adicionou nenhum produto à sua lista de desejos.
              </p>
              <a
                href="/products"
                className="inline-block bg-blue text-white py-2 px-6 rounded-md hover:bg-blue-dark transition-colors"
              >
                Explorar Produtos
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* Cabeçalho da tabela */}
                  <div className="flex items-center py-5.5 px-10 bg-gray-50">
                    <div className="min-w-[83px]"></div>
                    <div className="min-w-[387px]">
                      <p className="text-dark font-medium">Produto</p>
                    </div>
                    <div className="min-w-[205px]">
                      <p className="text-dark font-medium">Preço Unitário</p>
                    </div>
                    <div className="min-w-[265px]">
                      <p className="text-dark font-medium">Disponibilidade</p>
                    </div>
                    <div className="min-w-[150px]">
                      <p className="text-dark font-medium text-right">Ações</p>
                    </div>
                  </div>

                  {wishlistItems.map((item) => (
                    <SingleItem item={item} key={item.id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};