<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { UserCircle } from 'lucide-svelte';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
</script>

<nav class="mb-8">
	<AppBar>
		<svelte:fragment slot="lead"><a href="/">Home</a></svelte:fragment>
		<a href="/tracker-app">Tracker-App</a>
		<svelte:fragment slot="trail">
			{#if data.session}
				<a class="variant-ghost-tertiary btn-icon" href="/profile">
					<UserCircle />
				</a>
			{/if}
			<a class="variant-ghost-primary btn" href="/login">Login</a>
		</svelte:fragment>
	</AppBar>
</nav>
