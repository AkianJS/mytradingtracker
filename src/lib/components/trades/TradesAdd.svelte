<script lang="ts">
	import { enhance } from '$app/forms';
	import { FileButton, modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { FormError } from './form-error.interface';
	import { Link, X } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { positionColor } from './forms';
	import type { Checklist } from '$lib/interface/trades.interface';

	export let errors: FormError;

	let profit: number;
	let position = 'long';
	let percentage: number;
	let files: FileList;
	let image = '';
	let checklist: Checklist[] = [];
	let checkValue: string;
	let checkColor: string;
	let pair: string;

	const toastError: ToastSettings = {
		message: errors.error as string
	};

	const selectCheckColor: {
		[key: string]: string;
	} = {
		'variant-ghost-success': 'variant-ghost-success',
		'variant-ghost-warning': 'variant-ghost-warning',
		'variant-ghost-error': 'variant-ghost-error'
	};

	function onChangeHandler(e: Event): void {
		const { files } = e.target as HTMLInputElement;
		if (files) {
			image = URL.createObjectURL(files[0]);
		}
	}

	function openModal(): void {
		const modal: ModalSettings = {
			type: 'alert',
			image: image
		};

		modalStore.trigger(modal);
	}

	function onInputChipKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' && checkValue) {
			e.preventDefault();
			checklist = [
				...checklist,
				{
					value: checkValue.toUpperCase(),
					color: checkColor
				}
			];
			checkValue = '';
		} else if (e.key === 'Enter' && !checkValue) {
			e.preventDefault();
		}
	}

	function addChipOnClick(): void {
		if (checkValue) {
			checklist = [
				...checklist,
				{
					value: checkValue.toUpperCase(),
					color: checkColor
				}
			];
			checkValue = '';
		}
	}

	function deleteChecklistInput(index: number): void {
		checklist = checklist.filter((_, i) => i !== index);
	}

	$: if (errors.error) toastStore.trigger(toastError);
</script>

<div class="card variant-ghost-secondary mt-8 max-w-2xl p-4">
	<form
		class="space-y-4"
		method="post"
		action="?/addTrade"
		enctype="multipart/form-data"
		use:enhance={({ formElement }) => {
			return async ({ result }) => {
				if (result.type === 'success') {
					formElement.reset();
					await invalidateAll();
					position = 'long';
					checklist = [];
					checkValue = '';
					checkColor = '';
				}
			};
		}}>
		<div class="grid grid-cols-2 gap-4">
			<!-- Pair -->
			<label class="label">
				<span>Pair</span>
				<input
					placeholder="EUROUSD, BTCUSDT, etc."
					bind:value={pair}
					class="input"
					name="pair"
					required
					type="text" />
			</label>

			<!-- Position LONG/SHORT -->
			<label class="label">
				<span>Position</span>
				<select bind:value={position} class="select {positionColor(position)}" name="position">
					<option class="text-success-500" value="long">LONG</option>
					<option class="text-error-500" value="short">SHORT</option>
				</select>
			</label>
		</div>

		<!-- Checklist items -->
		<div class="grid items-end gap-4 md:grid-cols-4">
			<label class="label col-span-2">
				<span>Checklist</span>
				<input
					on:keydown={onInputChipKeyDown}
					placeholder="Hit enter to add"
					bind:value={checkValue}
					class="input"
					type="text" />
			</label>

			<input class="hidden" name="checklist" value={JSON.stringify(checklist)} type="text" />

			<label class="label">
				<span>Color</span>
				<select bind:value={checkColor} class="select {selectCheckColor[checkColor]}">
					<option class="text-success-500" value="variant-ghost-success">Good</option>
					<option class="text-warning-500" value="variant-ghost-warning">Meh</option>
					<option class="text-error-500" value="variant-ghost-error">Bad</option>
				</select>
			</label>

			<button type="button" on:click={addChipOnClick} class="variant-ghost-tertiary btn h-12 w-20"
				>Add</button>
		</div>
		<div class="mt-4 flex flex-wrap gap-4">
			{#each checklist ?? [] as item, i}
				<button on:click={() => deleteChecklistInput(i)} type="button">
					<span class="chip {item.color}">
						<span>
							<X size={14} />
						</span>
						<span>{item.value}</span>
					</span>
				</button>
			{/each}
		</div>

		<!-- Profit/Loss & Percentage -->
		<div class="grid grid-cols-2 place-items-center">
			<label class="label w-3/4 md:w-1/2">
				<span>Profit/Loss</span>
				<input
					pattern="[0-9]+([\.|,][0-9]+)?"
					placeholder="100.5"
					bind:value={profit}
					class="input"
					name="profit"
					step="0.01"
					required
					type="number" />
			</label>

			<!-- Percentage -->
			<label class="label w-3/4 md:w-1/2">
				<span>Percentage</span>
				<input
					placeholder="0-100"
					bind:value={percentage}
					class="input"
					name="percentage"
					step="0.01"
					required
					min="0"
					max="100"
					type="number" />
			</label>
		</div>

		<!-- Image logic -->
		<div class="label mx-auto w-min">
			<span>Image</span>
			<FileButton
				accept="image/*"
				button="variant-ghost-tertiary"
				on:change={onChangeHandler}
				bind:files
				name="image" />
		</div>

		{#if files}
			<button class="mx-auto flex items-center gap-4" on:click={openModal} type="button">
				<Link size={18} />
				Trading-screenshot</button>
		{/if}
		<!-- Note -->
		<label class="label">
			<span>Note</span>
			<textarea name="note" class="textarea" rows="4" />
		</label>

		<button class="variant-ghost-tertiary btn my-4" type="submit">Send</button>
	</form>
</div>

<style lang="postcss">
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		display: none;
		-webkit-appearance: textfield;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
