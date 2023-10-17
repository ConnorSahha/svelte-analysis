<script lang="ts">
	import type { ActionData } from './$types';
	import { FormError, Button, TextInput } from '$lib/components';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	const clearError = (key: string) => (errors = { ...errors, [key]: undefined });

	$: errors = form?.errors;
	let submitting = false;
</script>

<form
	class="flex w-full max-w-md flex-col gap-8 rounded-md border px-4 py-8 shadow-sm sm:px-8"
	method="post"
	action="?/authenticate"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<div class="flex flex-col gap-4">
		<TextInput
			id="app-id"
			label="App ID"
			error={errors?.appId}
			value={form?.fields?.appId}
			on:input={() => clearError('appId')}
		/>
		<TextInput
			id="app-secret"
			label="App Secret"
			error={errors?.appSecret}
			value={form?.fields?.appSecret}
			on:input={() => clearError('appSecret')}
		/>
		<TextInput
			id="external-id"
			label="External ID"
			error={errors?.externalId}
			value={form?.fields?.externalId}
			on:input={() => clearError('externalId')}
		/>
	</div>

	<FormError error={form?.error} />

	<Button disabled={submitting}>
		Authenticat{submitting ? 'ing' : 'e'}
	</Button>
</form>
