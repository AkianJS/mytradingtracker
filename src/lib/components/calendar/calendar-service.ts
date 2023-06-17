import type { Trade } from '$lib/interface/trades.interface';

/* This function takes an array of trades and a day string, and returns the sum of the profit percentages
   for all trades that occurred on that day. */
export function sumPercentageOfSameDay(trades: Trade[], day: string) {
	// Filter the trades array to only include trades that occurred on the specified day
	const sameDayTrades = trades.filter((trade) => trade.date === day);

	// If there are no trades on the specified day, return an empty string
	if (sameDayTrades.length === 0) return '';

	// Define a function to determine the correct operator (positive or negative) based on the profit value
	const correctOperator = (profit: number, profitPercentage: number) =>
		profit < 0 ? -profitPercentage : profitPercentage;

	// Use the reduce method to sum the profit percentages of all trades on the specified day
	const totalPercentage = sameDayTrades.reduce(
		(acc, trade) => acc + correctOperator(trade.profit, trade.profitPercentage),
		0
	);

	// Return the total percentage as a string
	return `${totalPercentage.toFixed(2)} %`;
}

/* This function takes an array of trades and a day string, and returns a CSS class name
   based on the sum of the profit percentages for all trades that occurred on that day. */
export function profitColor(trades: Trade[], day: string) {
	// Get the total percentage for the specified day
	const totalPercentage = +sumPercentageOfSameDay(trades, day).slice(0, -2);

	// If the total percentage is not an empty string, return a CSS class name based on its value
	if (!isNaN(totalPercentage)) {
		if (totalPercentage > 0) return 'text-success-500';
		if (totalPercentage < 0) return 'text-error-500';
	}

	// If the total percentage is an empty string, return a default CSS class name
	return 'text-tertiary-500';
}
