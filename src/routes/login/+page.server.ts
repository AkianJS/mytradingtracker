import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.supabase.auth.getSession();

	if (session) {
		throw redirect(303, '/tracker-app');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'E-mail or password invalid.'
				});
			}
			return fail(400, {
				error: 'Server error.'
			});
		}

		throw redirect(303, '/tracker-app');
	}
};
