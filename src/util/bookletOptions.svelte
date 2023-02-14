<script>
  export let group
</script>

<fieldset>
  <legend>Velg retning for duplex binding:</legend>

  <input bind:group={group} type="radio" name="binding" value="short-edge" id="short-edge"/>
  <label for="short-edge">Kortside</label>

  <input bind:group={group} type="radio" name="binding" value="long-edge" id="long-edge"/>
  <label for="long-edge">Langside</label>
</fieldset>

<style>
</style>
