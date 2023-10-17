<script lang="ts">
	export let color: 'primary' | 'danger' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'submit';
	export let disabled: boolean = false;

	$: bgColor =
		color === 'primary' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-rose-500 hover:bg-rose-600';
</script>

<button
	{disabled}
	{type}
	class="{bgColor} flex items-center justify-center rounded-md px-4 py-2 font-medium text-white disabled:opacity-60"
>
	<slot />
</button>
