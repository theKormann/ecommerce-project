import React from "react";
 import Image from "next/image";
 import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTiktok,
  FaYoutube,
 } from "react-icons/fa";

 const Footer = () => {
  const year = new Date().getFullYear();
  const primaryColor = "#5A8DEE"; // A slightly softer primary blue
  const secondaryColor = "#F5F7FA"; // Light gray for background
  const textColor = "#333"; // Dark gray for primary text
  const accentColor = "#FFC107"; // Soft yellow for accents (optional, can be removed if not desired)
  const iconSize = 20;

  return (
  <footer style={{ backgroundColor: secondaryColor, color: textColor }}>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Footer Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-6" style={{ color: primaryColor }}>
            Hovet Lilicão
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt size={iconSize} color={primaryColor} />
              <span>Av. Silvestre Pires De Freitas, 754 - Guarulhos, SP</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhoneAlt size={iconSize} color={primaryColor} />
              <a href="tel:1128351614" className="hover:text-blue-500">
                (11) 2835-1614
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope size={iconSize} color={primaryColor} />
              <a
                href="mailto:petstorelilicao@gmail.com"
                className="hover:text-blue-500"
              >
                petstorelilicao@gmail.com
              </a>
            </li>
          </ul>
          {/* Social Links */}
          <div className="flex space-x-4 mt-6">
            <a
              href="https://facebook.com/hovetlilicao"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-500 transition duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://wa.me/551128351614" 
              aria-label="WhatsApp"
              className="text-gray-500 hover:text-green-500 transition duration-300"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://www.instagram.com/hovetlilicao/"
              aria-label="Instagram"
              className="text-gray-500 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com/company/hovetlilicao/"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-700 transition duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.youtube.com/@hovetlilicao/shorts"
              aria-label="youtube"
              className="text-gray-500 hover:text-blue-700 transition duration-300"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-lg font-semibold mb-6" style={{ color: primaryColor }}>
            Conta
          </h2>
          <ul className="space-y-3">
            <li>
              <a href="/my-account" className="hover:text-blue-500 transition duration-200">
                Minha Conta
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Login / Registrar
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Carrinho
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Favoritos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Comprar
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-6" style={{ color: primaryColor }}>
            Links úteis
          </h2>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Política de Reembolso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                FAQ’s
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition duration-200">
                Contato
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter (Example - can be adapted) */}
        <div>
          <h2 className="text-lg font-semibold mb-6" style={{ color: primaryColor }}>
            Assine nossa newsletter
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Receba ofertas exclusivas e novidades diretamente no seu e-mail.
          </p>
          <div className="mt-2">
            <input
              type="email"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md mb-2"
              placeholder="Seu e-mail"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: primaryColor }}
            >
              Assinar
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p className="mb-2 md:mb-0">
          &copy; {year} Hovet Lilicão. Todos os direitos reservados.
        </p>
        <div className="flex items-center space-x-4">
          <p>Aceitamos:</p>
          <div className="flex space-x-3">
            <a href="#" aria-label="Visa">
              <Image
                src="/images/payment/payment-01.svg"
                alt="Visa"
                width={50}
                height={16}
              />
            </a>
            <a href="#" aria-label="PayPal">
              <Image
                src="/images/payment/payment-02.svg"
                alt="PayPal"
                width={35}
                height={20}
              />
            </a>
            <a href="#" aria-label="MasterCard">
              <Image
                src="/images/payment/payment-03.svg"
                alt="MasterCard"
                width={45}
                height={20}
              />
            </a>
            <a href="#" aria-label="Apple Pay">
              <Image
                src="/images/payment/payment-04.svg"
                alt="Apple Pay"
                width={50}
                height={16}
              />
            </a>
            <a href="#" aria-label="Google Pay">
              <Image
                src="/images/payment/payment-05.svg"
                alt="Google Pay"
                width={50}
                height={16}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
 };

 export default Footer;