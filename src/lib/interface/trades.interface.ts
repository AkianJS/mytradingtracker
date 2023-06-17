export interface Trade {
	id: string;
	symbol?: string;
	checklist: string[];
	tradeId: number;
	position: 'long' | 'short';
	date: string;
	profit: number;
	profitPercentage: number;
	image?: string;
	notes?: string;
}
