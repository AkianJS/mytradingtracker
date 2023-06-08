<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Modal } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Navbar from '$lib/components/layout/Navbar.svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const handleLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();

		if (error) return alert('No se pudo cerrar sesión');

		cancel();
	};
</script>

<Modal buttonPositive="variant-ghost-error" />

<Navbar {data} />

<main class="p-6">
	<slot />
</main>