<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	onMount(() => {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Confirm Email',
			body: 'Please confirm your email address to continue.',
			buttonTextCancel: 'Close'
		};

		modalStore.trigger(modal);
	});
</script>
