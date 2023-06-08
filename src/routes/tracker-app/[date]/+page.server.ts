import type { Trade } from '$lib/interface/trades.interface';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: ServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session) throw redirect(300, '/login');

	const { data, error } = await locals.supabase
		.from('trades')
		.select('*')
		.eq('date', params.date)
		.eq('id', session?.user.id);

	return {
		trades: data as Trade[],
		error
	};
};

export const actions = {
	addTrade: async ({ request, locals, params }) => {
		const session = await locals.getSession();

		const form = await request.formData();

		const date = params.date;
		const position = form.get('position');
		const profit = form.get('profit');
		const profitPercentage = form.get('percentage');
		const notes = form.get('note');
		const imageFile = form.get('image') as File;

		console.log(imageFile);

		if (imageFile.size > 0) {
			const { data, error } = await locals.supabase.storage
				.from('mytradingtracker-bucket')
				.upload(`${session?.user.id}/${imageFile.name}` as string, imageFile, {
					cacheControl: '3600',
					upsert: false
				});

			if (error) {
				console.warn(error);
			} else {
				console.log(data);
			}
		}

		return { success: true };

		const { error } = await locals.supabase.from('trades').insert([
			{
				id: session?.user.id,
				position,
				date,
				profit,
				image: null,
				profitPercentage,
				notes
			}
		]);

		if (error) {
			return fail(400, {
				error: 'Could not add trade.'
			});
		}

		return { success: true };
	},

	removeTrade: async ({ request, locals }) => {
		const session = await locals.getSession();

		const form = await request.formData();
		const tradeId = form.get('tradeId');

		const { error } = await locals.supabase
			.from('trades')
			.delete()
			.eq('id', session?.user.id)
			.eq('tradeId', tradeId);

		if (error) {
			return fail(400, {
				error: 'Could not remove trade.'
			});
		}

		return { success: true };
	}
} satisfies Actions;
