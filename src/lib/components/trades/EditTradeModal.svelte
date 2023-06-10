<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { component } = $modalStore[0] as unknown as {
		component: { props: { tradeId: string } };
	};

	const { tradeId } = component.props;

	function closeModal(): void {
		modalStore.close();
	}
</script>

<!-- @component rendered by the Skeleton Modal to edit a trade. -->

{#if $modalStore[0]}
	<div class="card space-y-4 p-6">
		<h3>Edit your trade</h3>
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
			<input name="" type="text" />
		</form>
	</div>
{/if}
