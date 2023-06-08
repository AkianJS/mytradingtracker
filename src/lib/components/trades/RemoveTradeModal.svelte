<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { component } = $modalStore[0] as unknown as {
		component: { props: { tradeId: string } };
	};

	const { tradeId } = component.props;

	export let parent: any;

	function closeModal(): void {
		modalStore.close();
	}
</script>

<!-- @component rendered by the Skeleton Modal to remove a trade. -->

{#if $modalStore[0]}
	<div class="card space-y-4 p-6">
		<h3>Remove trade</h3>
		<p>Are you sure you want to remove this trade?</p>
		<form
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						await invalidateAll();
						closeModal();
					}
				};
			}}
			method="post"
			action="?/removeTrade">
			<input class="hidden" value={tradeId} name="tradeId" type="text" />
			<div class="flex justify-end gap-4">
				<button on:click={closeModal} type="button" class="variant-ghost-secondary btn"
					>Cancel</button>
				<button type="submit" class="variant-ghost-error btn">Confirm?</button>
			</div>
			<slot />
		</form>
	</div>
{/if}
