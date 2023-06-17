<script lang="ts">
	import { blur } from 'svelte/transition';
	import type { Trade } from '$lib/interface/trades.interface';
	import TradesAdd from './TradesAdd.svelte';
	import TradesRow from './TradesRow.svelte';
	import type { FormError } from './form-error.interface';
	import { enhance } from '$app/forms';
	import PercentageCalculator from '../PercentageCalculator.svelte';

	export let trades: Trade[];
	export let errors: FormError;

	let isAdding = false;

	function changeIsAdding() {
		isAdding = !isAdding;
	}
</script>

<div class="table-container mx-auto">
	<form use:enhance method="post" action="?/updateTrade">
		<table class="table-hover table max-lg:overflow-y-scroll">
			<thead>
				<tr>
					<th class="table-cell-fit">Symbol</th>
					<th class="table-cell-fit">Position</th>
					<th class="table-cell-fit">Profit/Loss</th>
					<th class="table-cell-fit">Profit Percentaje</th>
					<th class="w-40">Image</th>
					<th class="w-40">Checklist</th>
					<th class="min-w-[30rem]">Note</th>
					<th class="table-cell-fit sticky right-0" />
				</tr>
			</thead>
			<tbody>
				{#each trades as trade, index}
					<TradesRow {index} {trade} />
				{/each}
			</tbody>
			<tfoot>
				<tr class="bg-surface-900">
					<th colspan="2">Total trades:</th>
					<td colspan="6">{trades.length}</td>
				</tr>
			</tfoot>
		</table>
	</form>
</div>
<button
	on:click={changeIsAdding}
	class=" btn mt-8 {isAdding ? 'variant-ghost-error' : 'variant-ghost-tertiary'}"
	>{isAdding ? 'Cancel' : 'Add new trade'}</button>

{#if isAdding}
	<section class="flex flex-wrap justify-center gap-4" transition:blur|local>
		<TradesAdd {errors} />
		<PercentageCalculator />
	</section>
{/if}
