<script>

    /* @type { import('./$houdini').PageData } */
    export let data

    console.log(`data`, data)

    $: ({ DhtReadingsByTimeRange } = data)

    // console.log(data.DhtReadingsByTimeRange)

</script>


{#if $DhtReadingsByTimeRange.fetching}
    <div>Loading...</div>
{:else}
    <div>
        <h2>Readings by Time Range</h2>
    <!-- { JSON.stringify($DhtReadingsByTimeRange)} -->
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

