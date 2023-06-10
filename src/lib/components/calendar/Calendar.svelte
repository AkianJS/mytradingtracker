<script lang="ts">
	import { onMount } from 'svelte';
	import { getMonth, getYear, addMonths, subMonths, startOfWeek, addDays } from 'date-fns';
	import { ArrowBigLeftDash, ArrowBigRight } from 'lucide-svelte';
	import type { Trade } from '$lib/interface/trades.interface';
	import { profitColor, sumPercentageOfSameDay } from './calendar-service';

	const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	export let trades: Trade[] = [];

	let currentDate = new Date();
	let month = getMonth(currentDate);
	let year = getYear(currentDate);
	let weeks: Date[][] = [];

	function generateCalendar() {
		let firstDayOfMonth = new Date(year, month, 1);
		let lastDayOfMonth = new Date(year, month + 1, 0);

		let start = startOfWeek(firstDayOfMonth);
		let end = addDays(lastDayOfMonth, 6 - lastDayOfMonth.getDay());

		let days = [];
		let day = start;

		while (day <= end) {
			days.push(day);
			day = addDays(day, 1);
		}

		weeks = [];

		for (let i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}
	}

	function nextMonth() {
		currentDate = addMonths(currentDate, 1);
		month = getMonth(currentDate);
		year = getYear(currentDate);
		generateCalendar();
	}

	function previousMonth() {
		currentDate = subMonths(currentDate, 1);
		month = getMonth(currentDate);
		year = getYear(currentDate);
		generateCalendar();
	}

	function formatDate(day: Date) {
		return `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`.toLocaleLowerCase();
	}

	onMount(() => {
		generateCalendar();
	});
</script>

<div class="mx-[auto] max-w-7xl">
	<div class="mb-4 flex h-12 items-center justify-around">
		<button class="btn-icon variant-ghost" on:click={previousMonth}><ArrowBigLeftDash /> </button>
		<h2>{MONTHS[month]} {year}</h2>
		<button class="btn-icon variant-ghost" on:click={nextMonth}>
			<ArrowBigRight />
		</button>
	</div>
	<table class="variant-glass-secondary w-full border-collapse">
		<thead>
			<tr>
				{#each WEEKDAYS_SHORT as day}
					<th>{day}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each weeks as week}
				<tr>
					{#each week as day}
						<td
							class="h-16 w-28 md:h-28 {getMonth(day) === month
								? 'hover:bg-secondary-800'
								: 'bg-gray-600 hover:bg-gray-700'}"
							><a
								href={`tracker-app/${formatDate(day)}`}
								class="relative flex h-full w-full items-start justify-start">
								{day.getDate()}
								<p
									class="{profitColor(
										trades,
										formatDate(day)
									)} absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 font-bold">
									{sumPercentageOfSameDay(trades, formatDate(day))}
								</p>
							</a>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	th,
	td {
		padding: 0.5rem;
		border: 1px solid #ccc;
	}
</style>
