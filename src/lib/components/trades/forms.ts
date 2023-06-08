export function percentageBetweenZeroAndOneHundreds(percentage: string): boolean {
	const percentageNumber = parseFloat(percentage);
	return !isNaN(percentageNumber) && percentageNumber >= 0 && percentageNumber <= 100;
}
