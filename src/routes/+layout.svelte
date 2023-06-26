<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Modal } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	export let data: LayoutData;

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

	$: ({ supabase, session } = data);
</script>

<svelte:head>
	<title>My Trading Tracker!</title>
	<meta
		name="description"
		content="Track your trades with ease using our powerful trading tracker app! Whether you're trading forex, cryptocurrencies, or other assets, our app makes it easy to keep track of your trades and monitor your performance over time. With support for multiple trading pairs and advanced analytics, you'll have all the tools you need to make informed trading decisions and stay on top of your portfolio. Plus, our app is built using the latest technologies like npm and TypeScript, so you can be sure you're getting a reliable and cutting-edge trading experience. Try it out today and take your trading to the next level!" />
</svelte:head>

<Modal buttonPositive="variant-ghost-error" />

<Navbar {data} />

<main class="p-6">
	<slot />
</main>

<Footer />
