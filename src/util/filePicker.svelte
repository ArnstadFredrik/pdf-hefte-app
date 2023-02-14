<script>
  import Button from './button.svelte'
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  function handleClick (e) {
    dispatch('click', e)
  }
</script>

<p>Velg eller slipp PDF filer her</p>
<Button  on:click={handleClick} text="Velg Fil"/>

<style>
</style>
