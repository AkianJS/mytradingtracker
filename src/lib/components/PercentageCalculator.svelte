<script lang="ts">
	let profit = 0;
	let amount = 0;
	let percentage = 0;

	function calculatePercentage() {
		percentage = (profit / amount) * 100;
	}

	$: profit, amount, calculatePercentage();
</script>

<div class="card mt-8 max-w-sm space-y-4 p-6">
	<h2 class="text-center">Trade percentage calculator</h2>
	<label class="label">
		<span>Account size</span>
		<input placeholder="5000" step="0.1" class="input" bind:value={amount} type="number" />
	</label>
	<label class="label">
		<span>Profit</span>
		<input class="input" step="0.1" bind:value={profit} type="number" />
	</label>
	<p>Percentage: {!isNaN(percentage) ? percentage : 0} %</p>
</div>
