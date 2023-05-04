<script>
	import { isAuthenticated, user } from '../../store';

	import { PUBLIC_SHOW_JSON_DEBUG } from '$env/static/public';


	/* @type { import('./$houdini').PageData } */
	export let data;

	console.log(`data`, data);

	$: ({ DhtReadingsByTimeRange } = data);

	// console.log(data.DhtReadingsByTimeRange)

	const debug = (obj, name = '') => {
		return (PUBLIC_SHOW_JSON_DEBUG == '1') ? `${name} ${JSON.stringify(obj, null, 2)}`  : '';
	}
</script>

<div>
	{debug($user, 'user: ')}

	{#if !$isAuthenticated}
		<div>
			<h1>Not Authenticated</h1>
			<!-- <button on:click={login}>Login</button> -->
		</div>
	{:else}
		{#if $DhtReadingsByTimeRange.fetching}
			<div>Loading...</div>
		{:else}
			<div>
				<h2>Readings by Time Range</h2>
				{debug($DhtReadingsByTimeRange, '$DhtReadingsByTimeRange: ')}
				{#each $DhtReadingsByTimeRange.data.getDhtReadingsByTimeRange as reading}
					<section>
						<ul>
							<li>Temp (F): {reading?.tempFahr}</li>
							<li>Temp (C): {reading?.tempCel}</li>
							<li>Humidity: {reading?.humidity}</li>
							<li>Created At: {reading?.createdAt}</li>
						</ul>
					</section>
				{/each}
			</div>
		{/if}
	{/if}
</div>
