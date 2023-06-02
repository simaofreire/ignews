/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/home',
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'static-cdn.jtvnw.net',
			},
		],
	},
};

module.exports = nextConfig
