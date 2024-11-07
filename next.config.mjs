/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/GustavoObara/**',
        },
        {
          protocol: 'https',
          hostname: 'github.com',
          pathname: 'tandpfun/skill-icons/**'
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          pathname: 'tandpfun/skill-icons/**'
        },
      ],
    },
  };
  
  export default nextConfig;
  