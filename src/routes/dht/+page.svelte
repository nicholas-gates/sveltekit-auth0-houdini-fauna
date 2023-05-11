<script>
	import { PUBLIC_SHOW_JSON_DEBUG } from '$env/static/public';

	/* @type { import('./$houdini').PageData } */
	export let data;

	const { isAuthenticated, user } = data;

	$: ({ DhtReadingsByTimeRange } = data);

	// console.log(data.DhtReadingsByTimeRange)

	const debug = (obj, name = '') => {
		return PUBLIC_SHOW_JSON_DEBUG == '1' ? `${name} ${JSON.stringify(obj, null, 2)}` : '';
	};
</script>

<div>
	<!-- {debug($user, 'user: ')} -->

	{#if !$isAuthenticated}
		<div>
			<h1>Not Authenticated</h1>
		</div>
	{:else if $DhtReadingsByTimeRange.fetching}
		<div>Loading...</div>
	{:else if $DhtReadingsByTimeRange.data?.getDhtReadingsByTimeRange}
		<div>
			<form action="/dht">
				<label for="start-time">Start Time:</label>
				<input type="text" id="start-time" name="s" value="2021-03-19T00:01:24.697092Z"/><br /><br />
				<label for="end-time">End Time:</label>
				<input type="text" id="end-time" name="e" value="2023-06-19T00:01:24.697092Z"/><br /><br />
				  <button type="submit">Submit</button>
			</form>

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
	{:else}
		<div>
			<h1>Something went wrong</h1>
			<div>{JSON.stringify($DhtReadingsByTimeRange)}</div>
		</div>
	{/if}
</div>
