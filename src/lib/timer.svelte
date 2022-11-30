<script>
  let interval = null;
  let running = false;
  let elapsed = 0;
  let oldElapsed = 0;
  let factor = 1;
  // TODO add totalTimer

  $: ms = pad3(0);
  $: s = pad2(0);
  $: min = pad2(0);
  $: hr = pad2(0);

  const pad2 = (number) => `00${number}`.slice(-2);
  const pad3 = (number) => `000${number}`.slice(-3);

  const warning = () => {
    const audio = new Audio('/beep.wav');
    audio.volume = 0.75;
    audio.play(); 
  }

  const countUp = () => {
    let startTime = Date.now();
    running = true;

    interval = setInterval(() => {
      elapsed = Date.now() - startTime + oldElapsed;
      
      ms = pad3(elapsed);
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 24);
    });
  }

  const countDown = () => {
    stop();
    const now = Date.now();
    const end = now + (elapsed  * factor);

    // Don't play the 3.5s audio file if less time than that has passed
    if((elapsed * factor) >= 3500) {
      setTimeout(() => {
        warning();
      }, (elapsed * factor) - 3500);
    }
    
    interval = setInterval(() => {
      elapsed = end - Date.now();
      
      ms = pad3(elapsed);
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 24);

      if(elapsed <= 0) {
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
  }
  const reset = () => {
    s = min = hr = pad2(0);
    ms = pad3(0);
    elapsed = oldElapsed = 0;
    running = false;
    clearInterval(interval);
  }

</script>

<h1>Work:Rest Timer</h1>

<div class='time'>{hr}:{min}:{s}.{ms}</div>

<div class='controls'>
  <button class='{running ? `rest` : `start`}' on:click={start}>{running ? `rest` : `start`}</button>
  <button class='stop' on:click={stop}>stop</button>
  <button class='reset' on:click={reset}>reset</button>
  <div class='rest_factor'>
    <p>Rest Multiplier</p>
    <input type='radio' id='1X' name='factor' bind:group={factor} value={1} checked><label for='1X'>1X</label><input type='radio' id='1.5X' name='factor' bind:group={factor} value={1.5}><label for='1.5X'>1.5X</label><input type='radio' id='2X' name='factor' bind:group={factor} value={2}><label for='2X'>2X</label><input type='radio' id='3X' name='factor' bind:group={factor} value={3}><label for='3X'>3X</label>
  </div>
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
  button.rest {
    background-color: #8e882a;
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  .rest_factor {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
    text-transform: uppercase;
    vertical-align: top;
  }
  .rest_factor input {
    display: none;
  }
  .rest_factor input:checked+label {
    background-color: #3e3c3c;
    box-shadow: inset 0 0 5px black;
  }
  .rest_factor label {
    display: inline-block;
    padding: 1rem;
    background-color: gray;
    margin: 0;
    transition: all .3s ease-in-out;
    border: solid 1px black;
  }
  .rest_factor label:hover {
    background-color: #666262;
  }
  .rest_factor label:nth-child(3) {
    border-radius: 1rem 0 0 1rem;
  }
  .rest_factor label:last-child {
    border-radius: 0 1rem 1rem 0;
  }
</style>
