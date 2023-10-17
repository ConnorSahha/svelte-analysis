import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	authenticate: async ({ request, cookies }) => {
		const formData = await request.formData();

		const appId = String(formData.get('AppID'));
		const appSecret = String(formData.get('AppSecret'));
		const externalId = String(formData.get('ExternalID'));

		const fields = { appId, appSecret, externalId };

		const errors: Record<string, string | undefined> = {};

		if (!appId || typeof appSecret !== 'string') {
			errors.appId = 'App ID is required';
		}
		if (!appSecret || typeof appSecret !== 'string') {
			errors.appSecret = 'App Secret is required';
		}
		if (!externalId || typeof externalId !== 'string') {
			errors.externalId = 'External ID is required';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				fields,
				errors
			});
		}

		try {
			const response = await fetch(
				'https://sandbox-api.sahha.ai/api/v1/oauth/profile/register/appId',
				{
					method: 'POST',
					headers: {
						AppId: appId,
						AppSecret: appSecret,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ externalId })
				}
			);

			if (!response.ok) {
				const errorResponse = await response.json();
				return fail(errorResponse.statusCode, { fields, error: errorResponse.title });
			}

			const data = await response.json();
			cookies.set('profileToken', data.profileToken, { maxAge: data.expiresIn });
			cookies.set('refreshToken', data.refreshToken);
			cookies.set('tokenType', data.tokenType, { maxAge: data.expiresIn });
		} catch (error) {
			return fail(500, {
				fields,
				error: (error as any)?.message ?? 'An unknown error occurred'
			});
		}

		throw redirect(303, '/analyze');
	}
};
