<script>
  import { createEventDispatcher } from 'svelte'
  import Button from './button.svelte'
  export let filePaths = []

  const dispatch = createEventDispatcher()
  function handleClick (e) {
    dispatch('reset', e)
  }
</script>

{#if filePaths.length !== 0}
  <div class="grid center">
    <h2>Lagret</h2>
    <p>Filene som ble valgt er lagret som hefte</p>
    {#each filePaths as path}
      <p class="filepath">
      <span class="old">{path.old}</span>
      <span class="arrow">--></span>
      <span class="new">{path.new}</span>
      </p>
    {/each}
    <Button on:click={handleClick} text="Lag flere hefter"/>
  </div>
{/if}

<style>
  .filepath {
    text-transform: italic;
  }
</style>
