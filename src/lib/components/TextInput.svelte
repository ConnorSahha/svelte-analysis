<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let label: string;
	export let value: string = '';
	export let error: string | undefined;

	const dispatch = createEventDispatcher();

	function input() {
		dispatch('input');
	}

	$: name = label.replace(/\s/g, '');
</script>

<div class="flex flex-col">
	{#if label}
		<label for={id} class="mb-1 text-sm font-semibold">{label}</label>
	{/if}
	<input
		{id}
		{name}
		{value}
		aria-invalid={error ? 'true' : undefined}
		class="rounded-md border px-4 py-2 aria-invalid:border-rose-500 aria-invalid:focus-visible:outline-rose-500"
		on:input={input}
	/>
	{#if error}
		<span class="text-xs font-medium text-rose-500">{error}</span>
	{/if}
</div>
