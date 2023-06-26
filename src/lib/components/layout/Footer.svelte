<script lang="ts">
	import { Github, Instagram, Linkedin } from 'lucide-svelte';
</script>

<div class="mt-auto bg-black p-6">
	<footer class="mx-auto mt-8 max-w-5xl space-y-6">
		<div class="flex items-center justify-center gap-x-12">
			<a
				href="https://github.com/AkianJs/mytradingtracker"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-full border-2 p-2">
				<Github />
			</a>

			<a
				href="https://www.linkedin.com/in/gonzajs-romero/"
				target="_blank"
				rel="noopener noreferrer"
				class="variant-gradient-secondary-tertiary rounded-full border-2 bg-gradient-to-br p-2">
				<Linkedin />
			</a>

			<a
				href="https://www.instagram.com/goonzaa.romero/"
				target="_blank"
				rel="noopener noreferrer"
				class="variant-gradient-error-warning rounded-full border-2 bg-gradient-to-br p-2">
				<Instagram />
			</a>
		</div>
		<div>
			<p class="mt-4 text-center">
				Made with ❤️ by <a
					class="text-blue-500"
					href="www.akianjs.netlify.app"
					target="_blank"
					rel="noopener noreferrer">AkianJs</a>
			</p>
			<!-- Make a contact section to contact me if find any bug or need a feature -->

			<p class="text-center">
				Contact me if you want any feature or find any bug! <br />
			</p>
		</div>
	</footer>
</div>

<style lang="postcss">
	a {
		transition: all 0.2s ease-in-out;
	}

	a:hover {
		transform: translateY(-2px);
	}
</style>
