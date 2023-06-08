<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { UserCircle } from 'lucide-svelte';
	import type { LayoutData } from '../../../routes/$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	const handleLogout = async () => {
		const { error } = await data.supabase.auth.signOut();

		if (error) return alert('No se pudo cerrar sesión');
		else goto('/login');
	};
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
				<button on:click={handleLogout} type="button" class="variant-ghost-error btn"
					>Logout</button>
			{:else}
				<a class="variant-ghost-primary btn" href="/login">Login</a>
			{/if}
		</svelte:fragment>
	</AppBar>
</nav>
