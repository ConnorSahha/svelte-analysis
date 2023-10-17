import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const profileToken = event.cookies.get('profileToken');
	const { pathname } = event.url;

	if (pathname === '/' && !!profileToken) throw redirect(303, '/analyze');
	if (pathname.startsWith('/analyze') && !profileToken) throw redirect(303, '/');

	const response = await resolve(event);
	return response;
};
