import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Для GitHub Pages нужен статический экспорт
  output: "export",
  
  // Отключаем оптимизацию изображений (не работает в статике)
  images: {
    unoptimized: true,
  },
  
  // ВАЖНО: замените 'НАЗВАНИЕ-РЕПОЗИТОРИЯ' на реальное название вашего репозитория
  // Если репозиторий называется, например, 'the-marlowe-affair':
  basePath: '/НАЗВАНИЕ-РЕПОЗИТОРИЯ',
  assetPrefix: '/НАЗВАНИЕ-РЕПОЗИТОРИЯ',
  
  // Добавляем слеш в конце для корректной работы ссылок
  trailingSlash: true,
  
  // Остальные ваши настройки
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
