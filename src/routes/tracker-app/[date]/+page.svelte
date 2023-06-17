<script lang="ts">
	import TradesDetail from '$lib/components/trades/TradesDetail.svelte';
	import type { FormError } from '$lib/components/trades/form-error.interface';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let errors: FormError;

	$: form,
		(errors = {
			error: form?.error
		});
</script>

<TradesDetail {errors} trades={data.trades} />
