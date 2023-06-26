<script lang="ts">
	import calendar from '$lib/assets/calendar.png';
	import registerPic from '$lib/assets/register.png';
</script>

<main class="mx-auto max-w-[1440px]">
	<section class="grid grid-cols-2 gap-6">
		<div />
		<article class="space-y-4">
			<h1 class="h1">Welcome to mytradingtracker!</h1>
			<div class="card variant-ghost-primary p-6">
				<p>
					To improve, it is necessary to measure what you are doing in order to know what you are
					doing right and what you are doing wrong. <br />
					To help you with this, we have created this tool that will allow you to keep track of your
					trades and analyze them.
				</p>
			</div>
		</article>
		<article class="card variant-ghost space-y-4 p-6">
			<h2 class="h2">How can i start?</h2>
			<p>
				First, if you want to save the track of your trades, you need to create an account! <br />
				Click <a class="text-blue-500" href="/register">here</a> if it is the first time you visit this
				app.
			</p>
			<footer>
				<img src={registerPic} alt="" />
			</footer>
		</article>

		<div />
		<div />
		<article class="card variant-ghost-surface space-y-4 p-6">
			<header class="card-header space-y-4">
				<h3 class="h3">Once you are logged in</h3>
				<p>
					Go to Tracker-App you're going to see a calendar! <br />
					Start to add your trades.
				</p>
			</header>
			<footer class="card-footer">
				<img class="rounded-lg" src={calendar} alt="" srcset="" />
			</footer>
		</article>
	</section>
</main>
