<script lang="ts">
	import { blur } from 'svelte/transition';
	import type { Trade } from '$lib/interface/trades.interface';
	import TradesAdd from './TradesAdd.svelte';
	import TradesRow from './TradesRow.svelte';
	import type { FormError } from './form-error.interface';

	export let trades: Trade[];
	export let errors: FormError;

	let isAdding = false;

	function changeIsAdding() {
		isAdding = !isAdding;
	}
</script>

<div class="table-container mx-auto max-w-6xl">
	<table class="table-hover table max-lg:hidden">
		<thead>
			<tr>
				<th class="table-cell-fit">Position</th>
				<th class="table-cell-fit">Profit/Loss</th>
				<th class="table-cell-fit">Profit Percentaje</th>
				<th class="w-1/4">Image</th>
				<th class="w-2/4">Note</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each trades as trade}
				<TradesRow {trade} />
			{/each}
		</tbody>
		<tfoot>
			<tr class="bg-surface-900">
				<th colspan="2">Total trades:</th>
				<td colspan="4">{trades.length}</td>
			</tr>
		</tfoot>
	</table>

	<button
		on:click={changeIsAdding}
		class=" btn mt-8 {isAdding ? 'variant-ghost-error' : 'variant-ghost-tertiary'}"
		>{isAdding ? 'Cancel' : 'Add new trade'}</button>

	{#if isAdding}
		<section transition:blur|local>
			<TradesAdd {errors} />
		</section>
	{/if}
</div>
