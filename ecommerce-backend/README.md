# 🛒 E-commerce Veterinário — Projeto Full Stack

Este é um projeto full stack desenvolvido durante meu estágio na clínica veterinária **Hovet Lilicão**, com o objetivo de criar um sistema de e-commerce funcional para a área veterinária, utilizando tecnologias modernas como **Spring Boot com JWT (Java)** no backend e **React.js** no frontend.

---

## ⚙️ Tecnologias Utilizadas

### 🔧 Backend (Java Spring Boot)
- Spring Web
- Spring Security + JWT
- Spring Data JPA
- Lombok
- MySQL
- Maven

### 🖥️ Frontend (React)
- React 18
- React Router DOM
- Material UI (MUI)
- Framer Motion
- Context API (para autenticação)
- Fetch API / Axios

---

## 📁 Estrutura do Projeto

### Backend
src/
├── config/ # Configurações de segurança (SecurityConfig)
├── controller/ # Controllers da API (ex: AuthController)
├── entity/ # Entidades JPA (ex: Usuario, Produto)
├── repository/ # Interfaces JPARepository
├── security/ # JWT Filter e Service
└── service/ # Regras de negócio

shell
Copiar
Editar

### Frontend
src/
├── pages/ # Páginas principais (Login, Produtos, Carrinho)
├── components/ # Componentes reutilizáveis (Navbar, CardProduto)
├── services/ # Serviços de API (authService, produtoService)
├── context/ # Autenticação (AuthContext)
└── App.jsx # Roteamento principal

yaml
Copiar
Editar

---

## 🔐 Autenticação JWT

A autenticação é baseada em **JWT (JSON Web Token)**. Ao fazer login, o backend gera um token que deve ser incluído nas requisições protegidas via header:

```http
Authorization: Bearer <seu_token>
🚀 Como rodar o projeto
🔹 Backend (Spring Boot)
Configure o application.properties com o seu banco de dados:

properties
Copiar
Editar
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=123456
Compile e rode com sua IDE ou ./mvnw spring-boot:run

🔹 Frontend (React)
Acesse a pasta do frontend:

bash
Copiar
Editar
cd frontend
Instale as dependências:

bash
Copiar
Editar
npm install
Rode o projeto:

bash
Copiar
Editar
npm run dev
🧪 Testando a API com Token
Faça login no frontend para obter o token.

Acesse rotas protegidas com o token armazenado no localStorage.

Exemplo de fetch com autenticação:

js
Copiar
Editar
fetch("/produtos", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
🧠 Aprendizados
Durante o desenvolvimento, aprofundei meus conhecimentos em:

Integração full stack (Java + React)

Segurança com Spring Security e JWT

Organização modular de código

Boas práticas REST

Versionamento com Git e GitHub

👨‍💻 Autor
Matheus Kormann
Estagiário de TI na Hovet Lilicão
Desenvolvedor Full Stack (React + Spring Boot)

📫 LinkedIn
📁 Projeto mantido com 💙 durante o estágio