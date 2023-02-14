<script>
  import FilePicker from './util/filePicker.svelte'
  import ResultView from './util/resultView.svelte'
  import Options from './util/bookletOptions.svelte'

  let filePaths = []
  $: dragClass = 'noDragDrop'
  let binding = ''

  const handleTitle = () => {
    console.log(titleField)
    window.electronAPI.setTitle(titleField)
  }

  const sendPDF = (pdfPaths, binding) => {
    window.electronAPI.dropFiles({paths: pdfPaths, binding})
  }

  const handleOpenFile = async () => {
    filePaths = await window.electronAPI.openFile()
  }


  const handleDrag = (e) => {
    dragClass = 'onDragDrop'
  }

  window.electronAPI.onFilesComplete((_event, value) => {
    filePaths = value
  })

  const handleDrop = (e) => {
    handleLeave()
    const pdfPaths = []
    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here:', f.path)
      pdfPaths.push(f.path)
    }
    sendPDF(pdfPaths, binding)
  }

  const handleLeave = (e) => {
    dragClass = 'noDragDrop'
  }

  function handleReset (e) {
    filePaths = []
  }

  function handleBinding (e) {
    binding = e.detail
    console.log('binding:', binding)
  }

</script>

<main 
       on:dragover|preventDefault|stopPropagation={handleDrag}
       on:drop|preventDefault|stopPropagation={handleDrop}
       on:dragleave|preventDefault|stopPropagation={handleLeave} 
       on:dragend|preventDefault|stopPropagation={handleLeave} 
       class={dragClass}>

  <div class="header grid center gap-1">
    <h1>PDF Hefte</h1>
    {#if filePaths.length === 0}
      <Options on:select={handleBinding}/>
      <FilePicker on:click={handleOpenFile}/>
    {:else}
      <ResultView on:reset={handleReset} filePaths={filePaths}/>
    {/if}
  </div>
</main>

<style>
  .onDragDrop {
    background-color: var(--main-clr-200);
  }

  .onDragDrop::after {
    content: '';
    position: absolute;
    inset: 1em;
    outline: 2px dotted var(--main-clr-600);
  }


  .noDragDrop {
    background-color: var(--bg-color)
  }

  .results {
  }

	main {
    --bg-color: var(--main-clr-100);

    font-family: 'Roboto', sans-serif;
    background-color: var(--bg-color);
    display: grid;
    gap: 0.5em;
    grid-template-rows: 20rem auto;
    width: 100vw;
    min-height: 100vh;
    align-items: center;
    justify-items: center;
	}

  main > * {
    padding: 2rem;
  }

	h1 {
    color: var(--theme-clr-500);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
    line-height: 1;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
