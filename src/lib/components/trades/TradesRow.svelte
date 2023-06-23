<script lang="ts">
	import type { Trade } from '$lib/interface/trades.interface';
	import { TrendingDown, TrendingUp } from 'lucide-svelte';
	import { fly, blur, type FlyParams, type BlurParams } from 'svelte/transition';
	import { positionColor } from './forms';
	import ActionsColumn from './trades-row/ActionsColumn.svelte';

	export let trade: Trade;
	export let index: number;

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

	function formatNotes(notes?: string) {
		return notes?.split(/\n/g) ?? '';
	}
</script>

<tr in:fly={flyTransitionOptions} out:blur={blurTransitionOptions}>
	<td>
		{trade?.pair?.toUpperCase() ?? 'N/A'}
	</td>
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

	<td class="flex flex-wrap gap-4">
		{#each trade?.checklist ?? [] as check}
			<span class="{check.color} chip">{check.value}</span>
		{/each}
	</td>

	<td class="table-cell w-96">
		{#if isEditing}
			<textarea bind:value={trade.notes} name="note" class="textarea" rows="4" />
			<input name="tradeId" class="hidden" type="number" bind:value={trade.tradeId} />
		{:else}
			{#each formatNotes(trade?.notes) as note}
				<p class="max-h-20 overflow-auto whitespace-normal">{note}</p>
			{/each}
		{/if}
	</td>

	<ActionsColumn {trade} {index} {isEditing} {changeIsEditing} />
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
