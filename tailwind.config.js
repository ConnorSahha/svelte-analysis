/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			aria: {
				invalid: "invalid='true'"
			}
		}
	},
	plugins: []
};
