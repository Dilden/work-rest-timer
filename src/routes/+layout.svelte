<script>
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

<slot />

{#if ReloadPrompt}
  <svelte:component this={ReloadPrompt} />
{/if}
