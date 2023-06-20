export interface Trade {
	id: string;
	pair: string;
	checklist: Checklist[];
	tradeId: number;
	position: 'long' | 'short';
	date: string;
	profit: number;
	profitPercentage: number;
	image?: string;
	notes?: string;
}

export type Checklist = {
	value: string;
	color: string;
};
