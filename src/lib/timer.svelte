<script>
  let interval = null;
  let running = false;
  //let now = 0;

  $: ms = pad3(0);
  $: s = pad2(0);
  $: min = pad2(0);
  $: hr = pad2(0);

  const pad2 = (number) => `00${number}`.slice(-2);
  const pad3 = (number) => `000${number}`.slice(-3);

  const countUp = () => {
    const startTime = Date.now();
    interval = setInterval(() => {
      running = true;
      const elapsed = Date.now() - startTime;
      
      ms = pad3(elapsed);
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 60);
    });
  }

  const countDown = () => {

  }

  const start = () => {
    if(!running) {
      countUp();
    }
    else {
      countDown();
    }
  }
  const stop = () => {
    clearInterval(interval);
    running = false;
  }
  const reset = () => {
    s = min = hr = pad2(0);
    ms = pad3(0);
  }

</script>

<h1>Work+Rest Timer</h1>

<div class='time'>{hr}:{min}:{s}.{ms}</div>

<button class='start' disabled={running} on:click={start}>{running ? `rest` : `start`}</button>
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
