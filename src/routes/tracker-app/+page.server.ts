import type { ServerLoad } from '@sveltejs/kit';
import type { Trade } from '$lib/interface/trades.interface';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) return;

	const { error, data } = await locals.supabase
		.from('trades')
		.select('*')
		.eq('id', session.user.id);

	if (error) {
		console.error('Error fetching trades', error);
	}

	return {
		trades: data as Trade[]
	};
};
