<script>
  import { createEventDispatcher, onMount, afterUpdate} from 'svelte';

  let binding = 'short-edge'

  const dispatch = createEventDispatcher();
  function handleSelect (e) {
    binding = e.target.value
    dispatch('select', binding)
  }

  onMount(() => {
    dispatch('select', 'short-edge')
  })

</script>

<fieldset on:change={handleSelect}>
  <legend>Velg retning for duplex binding:</legend>

  <input type="radio" name="binding" value="short-edge" id="short-edge" checked/>
  <label for="short-edge">Kortside</label>

  <input type="radio" name="binding" value="long-edge" id="long-edge"/>
  <label for="long-edge">Langside</label>
</fieldset>

<style>
</style>
