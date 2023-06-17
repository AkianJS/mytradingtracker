<script lang="ts">
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Edit, Save, Trash, XSquare } from 'lucide-svelte';
	import RemoveTradeModal from '../RemoveTradeModal.svelte';
	import type { Trade } from '$lib/interface/trades.interface';

	export let isEditing: boolean;
	export let index: number;
	export let trade: Trade;
	export let changeIsEditing: () => void;

	function openModalRemoveTrade(): void {
		const modalComponent: ModalComponent = {
			ref: RemoveTradeModal,

			props: {
				tradeId: trade.tradeId
			}
		};

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const stickyColumnColor = () => {
		if (index % 2 === 0) {
			return 'odd-column';
		} else {
			return 'even-column';
		}
	};
</script>

<th class="table-cell-fit sticky right-0 space-x-2 px-2 {stickyColumnColor()}">
	{#if isEditing}
		<button type="submit">
			<Save stroke-width={50} absoluteStrokeWidth size={20} />
		</button>

		<button on:click={changeIsEditing}>
			<XSquare size={20} />
		</button>
	{:else}
		<button on:click={changeIsEditing}>
			<Edit size={20} />
		</button>

		<button on:click={openModalRemoveTrade} type="button">
			<Trash size={20} />
		</button>
	{/if}
</th>
