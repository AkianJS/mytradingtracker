<script lang="ts">
	import type { Trade } from '$lib/interface/trades.interface';
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { Edit, Save, Trash, TrendingDown, TrendingUp, XSquare } from 'lucide-svelte';
	import { fly, blur, type FlyParams, type BlurParams } from 'svelte/transition';
	import RemoveTradeModal from './RemoveTradeModal.svelte';
	import { positionColor } from './forms';

	export let trade: Trade;

	let isEditing = false;

	const trendingColor = trade.position === 'long' ? 'text-success-500' : 'text-error-500';
	const isPositionLong = trade.position === 'long';

	const flyTransitionOptions: FlyParams = {
		duration: 500,
		y: 100
	};

	const blurTransitionOptions: BlurParams = {
		duration: 500,
		amount: 5
	};

	function profitOrLoss(profit: number) {
		if (profit > 0) {
			return 'text-success-500';
		} else if (profit < 0) {
			return 'text-error-500';
		} else {
			return 'text-gray-500';
		}
	}

	function changeIsEditing() {
		isEditing = !isEditing;
	}

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
</script>

<tr in:fly={flyTransitionOptions} out:blur|local={blurTransitionOptions}>
	<td class="{trendingColor} flex items-center gap-4">
		{#if isEditing}
			<select
				bind:value={trade.position}
				class="input {positionColor(trade.position)}"
				name="position">
				<option class="text-success-500" value="long">L</option>
				<option class="text-error-500" value="short">S</option>
			</select>
		{:else}
			{trade.position.toUpperCase()}
			{#if isPositionLong}
				<TrendingUp />
			{:else}
				<TrendingDown />
			{/if}
		{/if}
	</td>

	<td class={profitOrLoss(trade.profit)}>
		{#if isEditing}
			<input
				bind:value={trade.profit}
				class="input"
				placeholder="100.5"
				pattern="[0-9]+([,\.][0-9]+)?"
				step="0.01"
				name="profit"
				type="number" />
		{:else}
			{trade.profit} $
		{/if}
	</td>

	<td class={profitOrLoss(trade.profit)}>
		{#if isEditing}
			<input
				placeholder="0-100"
				bind:value={trade.profitPercentage}
				class="input"
				name="percentage"
				step="0.01"
				required
				min="0"
				max="100"
				type="number" />
		{:else}
			{trade.profitPercentage} %
		{/if}
	</td>

	<td>{trade.image ? 'Screenshot' : ''}</td>

	<td>
		{#if isEditing}
			<textarea bind:value={trade.notes} name="note" class="textarea" rows="4" />
			<input name="tradeId" class="hidden" type="number" bind:value={trade.tradeId} />
		{:else}
			<p class="max-h-20 overflow-auto whitespace-normal">{trade.notes ?? ''}</p>
		{/if}
	</td>

	<td class="sticky flex gap-4">
		{#if isEditing}
			<button type="submit">
				<Save size={20} />
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
	</td>
</tr>

<style lang="postcss">
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: textfield;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
