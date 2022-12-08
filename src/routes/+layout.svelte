<script>
  import { pwaInfo } from 'virtual:pwa-info';
  import ReloadPrompt from '$lib/ReloadPrompt.svelte';

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<slot></slot>

<ReloadPrompt />
