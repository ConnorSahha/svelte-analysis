import { fail } from '@sveltejs/kit';

export const actions = {
	getAnalysis: async ({ cookies }) => {
		const profileToken = cookies.get('profileToken');

		if (!profileToken) return fail(401, { error: 'Unauthorized' });

		// Start and end dates from today to 30 days ago
		const currentDate = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(currentDate.getDate() - 30);

		const startDateTime = thirtyDaysAgo.toISOString();
		const endDateTime = currentDate.toISOString();

		try {
			const response = await fetch('https://sandbox-api.sahha.ai/api/v1/profile/analysis', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `profile ${profileToken}` },
				body: JSON.stringify({
					startDateTime,
					endDateTime
				})
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				return fail(errorResponse.statusCode, { error: errorResponse.title });
			}

			// Catch "No Content" error as not JSON parsable
			if (response.status === 204) return { data: JSON.stringify({}) };

			const data = await response.json();
			return { data: JSON.stringify(data) };
		} catch (error) {
			return fail(500, {
				error: (error as any)?.message ?? 'An unknown error occurred'
			});
		}
	},
	deauthenticate: async ({ cookies }) => {
		cookies.delete('profileToken');
		cookies.delete('refreshToken');
		cookies.delete('tokenType');
	}
};
