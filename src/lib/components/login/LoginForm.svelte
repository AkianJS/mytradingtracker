<script lang="ts">
	import { enhance } from '$app/forms';

	export let title: string;

	const parraph =
		title.toLowerCase() === 'register'
			? 'You already have an account?'
			: "You don't have an account?";

	const anchorText = title.toLowerCase() === 'register' ? 'login here!' : 'register here!';
	const anchorLink = title.toLowerCase() === 'register' ? '/login' : '/register';
	const action = title.toLowerCase() === 'register' ? '?/register' : '?/login';
</script>

<main class="card variant-glass-primary mx-auto max-w-lg space-y-4 p-4 pb-8">
	<h2 class="h2 text-center">{title}</h2>
	<form use:enhance {action} class="space-y-4" method="post">
		<label class="label">
			<span>E-mail</span>
			<input required name="email" class="input" type="email" />
		</label>

		<label class="label">
			<span>Password</span>
			<input required name="password" class="input" type="password" />
		</label>

		<p>
			{parraph} <a class="text-secondary-400" href={anchorLink}>{anchorText}</a>
		</p>
		<button type="submit" class="variant-ghost-success btn w-full">{title}</button>
	</form>
	<form method="post" action="?/google">
		<button type="submit" class="variant-ghost-secondary btn w-full">Login with Google</button>
	</form>
</main>

<style lang="postcss">
	input {
		@apply px-3 py-2;
	}
</style>
