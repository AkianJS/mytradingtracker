<script lang="ts">
	import TradesDetail from '$lib/components/trades/TradesDetail.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;
</script>

<TradesDetail trades={data.trades} />
