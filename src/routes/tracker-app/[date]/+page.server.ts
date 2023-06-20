import type { Trade } from '$lib/interface/trades.interface';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import { formatTime } from '$lib/utils';

export const load: ServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session) throw redirect(300, '/login');

	const { data, error } = await locals.supabase
		.from('trades')
		.select('*')
		.eq('date', params.date)
		.eq('id', session?.user.id);

	const orderTrades = data?.sort((a, b) => a.tradeId - b.tradeId) as Trade[];

	return {
		trades: orderTrades,
		error
	};
};

export const actions = {
	addTrade: async ({ request, locals, params }) => {
		const session = await locals.getSession();
		const form = await request.formData();

		// Get the data from the form
		const date = params.date;
		const position = form.get('position');
		const profit = form.get('profit');
		const profitPercentage = form.get('percentage');
		const notes = form.get('note');
		const imageFile = form.get('image') as File;
		const checklist = form.get('checklist') as string;
		const pair = form.get('pair');

		let imageUrl = null;

		if (imageFile?.size > 0) {
			const hour = formatTime(new Date());

			// If the image is not empty, upload it to the bucket
			// and get the public URL
			const { data, error } = await locals.supabase.storage
				.from('mytradingtracker-bucket')
				.upload(`${session?.user.id}/${params.date}-${hour}`, imageFile, {
					cacheControl: '3600',
					upsert: false
				});

			if (error) {
				return fail(400, {
					error: 'Could not upload image.'
				});
			} else {
				imageUrl = locals.supabase.storage.from('mytradingtracker-bucket').getPublicUrl(data.path);
			}
		}

		const { error } = await locals.supabase.from('trades').insert([
			{
				id: session?.user.id,
				pair,
				position,
				date,
				checklist: JSON.parse(checklist),
				profit,
				image: imageUrl?.data.publicUrl ?? null,
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

	updateTrade: async ({ request, locals, params }) => {
		const session = await locals.getSession();
		const form = await request.formData();

		// Get the data from the form
		const position = form.get('position');
		const profit = form.get('profit');
		const profitPercentage = form.get('percentage');
		const notes = form.get('note');
		const imageFile = form.get('image') as File;
		const tradeId = form.get('tradeId');

		let imageUrl = null;

		if (imageFile?.size > 0) {
			const hour = formatTime(new Date());

			// If the image is not empty, upload it to the bucket
			// and get the public URL
			const { data, error } = await locals.supabase.storage
				.from('mytradingtracker-bucket')
				.upload(`${session?.user.id}/${params.date}-${hour}`, imageFile, {
					cacheControl: '3600',
					upsert: false
				});

			if (error) {
				return fail(400, {
					error: 'Could not upload image.'
				});
			} else {
				imageUrl = locals.supabase.storage.from('mytradingtracker-bucket').getPublicUrl(data.path);
			}
		}

		const { error } = await locals.supabase
			.from('trades')
			.update({
				position,
				profit,
				image: imageUrl?.data.publicUrl ?? null,
				profitPercentage,
				notes
			})
			.eq('tradeId', tradeId);

		if (error) {
			return fail(400, {
				error: 'Could not update the trade.'
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
