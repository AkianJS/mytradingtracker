<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Trade } from '$lib/interface/trades.interface';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Edit, Trash, TrendingDown, TrendingUp } from 'lucide-svelte';
	import { fly, blur, type FlyParams, type BlurParams } from 'svelte/transition';

	export let trade: Trade;

	let formToRemoveTrade: HTMLFormElement;

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

	function openModalRemoveTrade(): void {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Remove Trade?',
			body: 'Are you sure you want to remove this trade?',
			response(r) {
				if (r) formToRemoveTrade.submit();
			}
		};

		modalStore.trigger(modal);
	}
</script>

<tr in:fly={flyTransitionOptions} out:blur={blurTransitionOptions}>
	<td class="{trendingColor} flex items-center gap-4"
		>{trade.position.toUpperCase()}
		{#if isPositionLong}
			<TrendingUp />
		{:else}
			<TrendingDown />
		{/if}
	</td>
	<td class={profitOrLoss(trade.profit)}>{trade.profit} $</td>
	<td class={profitOrLoss(trade.profit)}>{trade.profitPercentage} %</td>
	<td>{trade.image ?? ''}</td>
	<td><p class="whitespace-normal">{trade.notes ?? ''}</p></td>
	<td class="sticky flex gap-4">
		<button>
			<Edit size={20} />
		</button>

		<form bind:this={formToRemoveTrade} use:enhance method="post" action="?/removeTrade">
			<button on:click={openModalRemoveTrade} type="button">
				<input class="hidden" value={trade.tradeId} name="tradeId" type="text" />
				<Trash size={20} />
			</button>
		</form>
	</td>
</tr>
