/** @type {import('next').NextConfig} */
const nextConfig = {


    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.fakercloud.com',
           
          },
          {
            protocol: 'https',
            hostname: 'cloudflare-ipfs.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn-icons-png.flaticon.com',
            
          }
        ],
      },

};

export default nextConfig;
