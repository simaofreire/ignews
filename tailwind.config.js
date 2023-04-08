/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				'gray-50': '#e1e1e6',
				'gray-300': '#a8a8b3',
				'gray-800': '#29292e',
				'gray-850': '#1f2729',
				'gray-900': '#121214',

				'cyan-500': '#61dafb',

				'yellow-500': '#eba417',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		screens: {
			lg: { max: '1024px' },
			md: { max: '768px' },
			sm: { max: '425px' },
			xs: { max: '350px' },
		},
	},
	plugins: [],
};
