import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Popular",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Comprar",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Contato",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "páginas",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Loja com barra lateral",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Loja sem barra lateral",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Meu Carrinho",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Lista de Favoritos",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Entrar",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Registrar",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Minha Conta",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "Contato",
        newTab: false,
        path: "/contact",
      }
    ],
  },
  {
    id: 7,
    title: "Landing Pages",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Gatos",
        newTab: false,
        path: "http://hovetcat.vercel.app/",
      },
      {
        id: 72,
        title: "Cães",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Calopsitas",
        newTab: false,
        path: "/",
      },
      {
        id: 74,
        title: "Silvestres",
        newTab: false,
        path: "/blogs/blog-details",
      },
      {
        id: 75,
        title: "Ozonioterapia",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];
