import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, '/tracker-app');
	}
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await locals.supabase.auth.signUp({
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
		throw redirect(303, '/confirm-email');
	},

	google: async ({ locals }) => {
		const { error: err, data } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Could not sign in with Google.'
				});
			}
			return fail(400, {
				error: 'Server error.'
			});
		}

		throw redirect(303, data.url);
	}
};
