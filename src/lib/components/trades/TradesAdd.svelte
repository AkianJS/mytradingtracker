<script lang="ts">
	import { enhance } from '$app/forms';
	import { FileButton, modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { FormError } from './form-error.interface';
	import { Link } from 'lucide-svelte';
	import { error } from '@sveltejs/kit';

	interface PositionColor {
		[key: string]: string;
	}

	export let errors: FormError;

	let profit: number;
	let position: string = 'long';
	let percentage: number;
	let files: FileList;
	let image: string = '';

	const positionColor: PositionColor = {
		long: 'text-success-500',
		short: 'text-error-500'
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

	const toastError: ToastSettings = {
		message: errors.error as string
	};

	$: if (errors.error) toastStore.trigger(toastError);
</script>

<div class="card variant-ghost-secondary mt-8 p-4">
	<form
		class="space-y-4"
		method="post"
		action="?/addTrade"
		enctype="multipart/form-data"
		use:enhance>
		<label class="label mx-auto w-56">
			<span>Position</span>
			<select bind:value={position} class="select {positionColor[position]}" name="position">
				<option class="text-success-500" value="long">LONG</option>
				<option class="text-error-500" value="short">SHORT</option>
			</select>
		</label>

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
		-webkit-appearance: textfield;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
