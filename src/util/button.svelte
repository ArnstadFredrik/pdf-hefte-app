<script>
  import { createEventDispatcher } from 'svelte';
  export let text

  const dispatch = createEventDispatcher();
  function handleClick (e) {
    dispatch('click', e)
  }
</script>

<button class="btn" on:click={handleClick}>{text}</button>

<style>
  .btn {
    --btn-clr: var(--main-clr-300);
    --btn-clr-dark: var(--main-clr-400);

    padding: 1em 2em;
    border: none;
    background-color: var(--btn-clr);
  }
  .btn:hover,
  .btn:focus {
    background-color: var(--btn-clr-dark);
    outline: 2px solid var(--btn-clr);
  }
</style>
