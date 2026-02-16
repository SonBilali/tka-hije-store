/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com', // Këtë e kishe nga fotoja e kaluar
      },
      {
        protocol: 'https',
        hostname: 'www.designscene.net', // <--- SHTO KËTË PËR ÇANTËN!
      }
    ],
  },
};

export default nextConfig;