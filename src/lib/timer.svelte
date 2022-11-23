<script>
  let interval = null;
  let running = false;
  let elapsed = 0;
  let oldElapsed = 0;
  let startTime = null;
  let factor = 1;
  let totalTime = null;

  $: ms = pad3(0);
  $: s = pad2(0);
  $: min = pad2(0);
  $: hr = pad2(0);

  const pad2 = (number) => `00${number}`.slice(-2);
  const pad3 = (number) => `000${number}`.slice(-3);

  const countUp = () => {
    startTime = Date.now();
    running = true;

    interval = setInterval(() => {
      elapsed = Date.now() - startTime + oldElapsed;
      
      ms = pad3(elapsed);
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 60);
    });
  }

  const countDown = () => {
    stop();
    const end = Date.now() + (elapsed  * factor);
    
    interval = setInterval(() => {
      let now = Date.now();
      let diff = end - now;
      
      ms = pad3(diff);
      s = pad2(Math.floor(diff / 1000) % 60);
      min = pad2(Math.floor(diff / 60000) % 60);
      hr = pad2(Math.floor(diff / 3600000) % 60);

      if(diff <= 0) {
        clearInterval(interval);
        reset();
        countUp();
      }
    });
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
    oldElapsed = elapsed;
    running = false;
  }
  const reset = () => {
    s = min = hr = pad2(0);
    ms = pad3(0);
    elapsed = oldElapsed = 0;
  }

</script>

<h1>Work+Rest Timer</h1>

<div class='time'>{hr}:{min}:{s}.{ms}</div>

<div class='controls'>
  <button class='start' on:click={start}>{running ? `rest` : `start`}</button>
  <button class='stop' on:click={stop}>stop</button>
  <button class='reset' on:click={reset}>reset</button>
</div>

<style>
  h1 {
    text-align: center;
  }
  .time {
    margin: 1.5rem;
    font-size: 4rem;
  }
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  button {
    padding: 1.1rem 1.4rem;
    margin: 1.1rem;
    font-size: 1.5rem;
    border: none;
    background-color: #496bf0;
    color: white;
    transition: all .4s ease-in-out;
    cursor: pointer;
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  button:hover {
    background-color: #2047df;
  }
  button.stop {
    background-color: #df3d2c;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  button.stop:hover {
    background-color: #a81303;
  }
  button.start {
    background-color: #408e2a;
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  button.start:hover {
    background-color: #245e14;
  }
</style>
