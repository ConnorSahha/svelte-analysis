<script lang="ts">
	import { AlertIcon } from './icons';

	export let error: string | undefined;
</script>

{#if error}
	<span
		class="flex gap-2 rounded-md border-2 border-rose-400 bg-rose-100 px-4 py-2 font-medium text-rose-500"
	>
		<AlertIcon />
		{error}
	</span>
{/if}
