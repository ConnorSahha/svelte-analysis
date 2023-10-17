<script lang="ts">
	import type { ActionData } from './$types';
	import { FormError, Button } from '$lib/components';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	let deauthenticating = false;
	let submitting = false;
</script>

<div class="flex w-full max-w-md flex-col gap-8 rounded-md border px-4 py-8 shadow-sm sm:px-8">
	<form
		class="flex w-full flex-col"
		method="POST"
		action="?/deauthenticate"
		use:enhance={() => {
			deauthenticating = true;
			return async ({ update }) => {
				await update();
				deauthenticating = false;
			};
		}}
	>
		<Button disabled={deauthenticating} color="danger">
			Deauthenticat{deauthenticating ? 'ing' : 'e'}
		</Button>
	</form>

	<form
		class="flex w-full flex-col gap-8"
		method="post"
		action="?/getAnalysis"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<FormError error={form?.error} />

		<Button disabled={submitting}>
			Get{submitting ? 'ting' : ''} analysis
		</Button>
	</form>

	{#if form?.data}
		<div>{form.data}</div>
	{/if}
</div>
