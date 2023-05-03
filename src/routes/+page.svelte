<script>

    /* @type { import('./$houdini').PageData } */
    export let data

    console.log(`data`, data)

    $: ({ AllCharacters } = data)

    // console.log(data.AllCharacters)

</script>


{#if $AllCharacters.fetching}
    <div>Loading...</div>
{:else}
    <div>
    <!-- { JSON.stringify($AllCharacters.data)} -->
    {#each $AllCharacters.data.characters.results as character}
      <section>
        <a data-sveltekit-prefetch href={`/character/${character?.id}`}>
            <img src={character?.image} alt={character?.name} />
            <h2>{character?.name}</h2>
        </a>
      </section>
    {/each}
    </div>
{/if}

