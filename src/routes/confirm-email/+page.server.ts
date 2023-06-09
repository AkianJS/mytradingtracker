import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session?.user.user_metadata.email_verified) {
		throw redirect(303, '/tracker-app');
	}
};
