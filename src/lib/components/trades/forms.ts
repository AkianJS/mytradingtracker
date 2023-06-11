export function percentageBetweenZeroAndOneHundreds(percentage: string): boolean {
	const percentageNumber = parseFloat(percentage);
	return !isNaN(percentageNumber) && percentageNumber >= 0 && percentageNumber <= 100;
}

export function positionColor(position: string): string {
	return position.toLocaleLowerCase() === 'long' ? 'text-success-500' : 'text-error-500';
}
