/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'media.bizwebmedia.net',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/images',
				destination: 'http://localhost:5000/images',
			},
		];
	},
};

module.exports = nextConfig;
