<script>
  import Timer from '$lib/timer.svelte';
</script>

 
<div class='content'>
  <div></div>
  <Timer />
  <div class='built'>
     🔨 built by <a href='https://www.closingtags.com/svelte-workrest-timer/' rel='noreferrer' target='_blank'>closingtags.com</a>
  </div>
</div>


<style>
div.content {
  display: grid;
  min-height: 100%;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  width: 100%;
  color: #d9d9d7;
}
.built {
  margin: 1rem;
}
</style>
