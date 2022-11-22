<script>
  let interval = null;
  let running = false;
  let now = 0;

  $: ms = 0;
  $: s = 0;
  $: min = 0;
  $: hr = 0;

  const pad2 = (number) => `00${number}`.slice(-2);
  const pad3 = (number) => `000${number}`.slice(-3);

  const start = () => {
    interval = setInterval(() => {
      running = true;
      now++;
      let count = now;

      hr = Math.floor(count / 3600000);
      count -= hr * 360000;

      min = Math.floor(count / 60000);
      count -= min * 600;

      s = Math.floor(count / 1000);
      count -= s * 1000;

      ms = count;

    });
  }
  const stop = () => {
    clearInterval(interval);
    running = false;
  }
  const reset = () => {
    ms = s = min = hr = now = 0;
  }

</script>

<h1>Work+Rest Timer</h1>

<div class='time'>{hr}:{min}:{s}.{ms}</div>

<button class='start' disabled={running} on:click={start}>start</button>
<button class='stop' on:click={stop}>stop</button>
<button class='reset' on:click={reset}>reset</button>

<style>
  h1 {
    text-align: center;
  }
  .time {
    margin: 1.5rem;
    font-size: 4rem;
  }
  button {
    padding: 1.4rem 1.8rem;
    margin: 1.3rem;
    border: none;
    background-color: #496bf0;
    color: white;
    transition: all .4s ease-in-out;
    cursor: pointer;
  }
  button:hover {
    background-color: #2047df;
  }
  button.stop {
    background-color: #df3d2c;
  }
  button.stop:hover {
    background-color: #a81303;
  }
  button.start {
    background-color: #408e2a;
  }
  button.start:hover {
    background-color: #245e14;
  }
</style>
