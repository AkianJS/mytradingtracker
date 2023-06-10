<script lang="ts">
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Calendar trades={data.trades} />
