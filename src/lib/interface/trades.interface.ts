export interface Trade {
	id: string;
	tradeId: number;
	position: 'long' | 'short';
	date: string;
	profit: number;
	profitPercentage: number;
	image?: string;
	notes?: string;
}
