/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas para estabilidade
  reactStrictMode: false,
  swcMinify: true,
  
  // Configurações experimentais simplificadas
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack otimizado para desenvolvimento
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Configurações de watch mais estáveis
      config.watchOptions = {
        poll: false,
        aggregateTimeout: 200,
        ignored: /node_modules/,
      };
      
      // Otimizações para HMR
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    
    return config;
  },
  
  // Headers básicos de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;