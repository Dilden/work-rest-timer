<script>
  import Timer from '$lib/timer.svelte';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';

  let ReloadPrompt;
  onMount(async() => {
      pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default)
    });

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>
 
<div class='content'>
  <Timer />
</div>

{#if ReloadPrompt}
  <svelte:component this={ReloadPrompt} />
{/if}

<style>
div.content {
  text-align: center;
  width: 100%;
  color: #d9d9d7;
}
</style>
