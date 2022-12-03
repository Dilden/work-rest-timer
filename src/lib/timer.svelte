<script>
  let interval = null;
  let totalInterval = null;
  let timeout = null;
  let running = false;
  let elapsed = 0;
  let oldElapsed = 0;
  let factor = 1;
  let disabled = false;
//let prevState = null; // TODO track previous state of timer; e.g. up or down

  let totalElapsed = 0;
  let totalOldElapsed = 0;

  $: activeSplits = [];
  $: restSplits = [];

  $: ms = pad3(0);
  $: s = pad2(0);
  $: min = pad2(0);
  $: hr = pad2(0);
  $: totalMs = pad3(0);
  $: totalS = pad2(0);
  $: totalMin = pad2(0);
  $: totalHr = pad2(0);

  const pad2 = (number) => `00${number}`.slice(-2);
  const pad3 = (number) => `000${number}`.slice(-3);

  const warning = () => {
    const audio = new Audio('/beep.wav');
    audio.volume = 0.75;
    audio.play(); 
  }

  const countUp = () => {
    running = true;
    disabled = false;
    let startTime = Date.now();

    interval = setInterval(() => {
      elapsed = Date.now() - startTime + oldElapsed;
      
      ms = pad3(Math.floor(elapsed));
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 24);
    });
  }

  const countDown = () => {
    timerStop();
    disabled = true;
    addActiveSplit(`${hr}:${min}:${s}:${ms}`);
    const now = Date.now();
    const beepStart = elapsed;
    const end = now + beepStart;

    // Only play the 3.5s audio file if less time than that has passed
    if(beepStart >= 3500) {
      timeout = setTimeout(() => {
        warning();
      }, beepStart - 3500);
    }
    
    interval = setInterval(() => {
      elapsed = end - Date.now();
      
      ms = pad3(Math.floor(elapsed));
      s = pad2(Math.floor(elapsed / 1000) % 60);
      min = pad2(Math.floor(elapsed / 60000) % 60);
      hr = pad2(Math.floor(elapsed / 3600000) % 24);

      if(elapsed <= 0) {
        interval = clearInterval(interval);
        addRestSplit(`${pad2(Math.floor(beepStart / 3600000) % 24)}:${pad2(Math.floor(beepStart / 60000) % 60)}:${pad2(Math.floor(beepStart / 1000) % 60)}:${pad3(Math.floor(beepStart))}`);
        elapsed = oldElapsed = 0;
        running = false;
        s = min = hr = pad2(0);
        ms = pad3(0);
        countUp();
      }
    });
  }

  const addActiveSplit = (time) => {
    activeSplits.push(time);
    activeSplits = activeSplits;
  }
  const addRestSplit = (time) => {
    restSplits.push(time);
    restSplits = restSplits;
  }

  const totalStart = () => {
    let startTime = Date.now();
    totalInterval = setInterval(() => {
      totalElapsed = Date.now() - startTime + totalOldElapsed;
      
      totalMs = pad3(totalElapsed);
      totalS = pad2(Math.floor(totalElapsed / 1000) % 60);
      totalMin = pad2(Math.floor(totalElapsed / 60000) % 60);
      totalHr = pad2(Math.floor(totalElapsed / 3600000) % 24);
    });
 }

  const start = () => {
    if(!running) {
      countUp();
    }
    else{
      elapsed = elapsed * factor;
      countDown();
    }
    if(!totalInterval) {
      totalStart();
    }
  }
  const timerStop = () => {
    interval = clearInterval(interval);
    totalInterval = clearInterval(totalInterval);
    timeout = clearTimeout(timeout);

    oldElapsed = elapsed;
    totalOldElapsed = totalElapsed;
  }
  const stop = () => {
    timerStop();
    }
    running = !running;
    disabled = false;
  }
  const reset = () => {
    totalS = s = totalMin = min = totalHr = hr = pad2(0);
    totalMs = ms = pad3(0);
    totalElapsed = totalOldElapsed = elapsed = oldElapsed = 0;
    
    running = false;
    disabled = false;

    activeSplits = restSplits = [];

    interval = clearInterval(interval);
    totalInterval = clearInterval(totalInterval);
    timeout = clearTimeout(timeout);
  }

</script>

<h1>Work:Rest Timer</h1>

<div class='time'>{hr}:{min}:{s}.{ms}</div>
<div class='total_time'>{totalHr}:{totalMin}:{totalS}.{totalMs}</div>

<div class='controls'>
  <button class='start_button {running ? `rest` : `start`}' disabled={disabled ? `disabled` : ``} on:click={start}>{running ? `rest` : `start`}</button>
  <button class='stop' on:click={stop}>stop</button>
  <button class='reset' on:click={reset}>reset</button>
  <div class='rest_factor'>
    <p>Rest Multiplier</p>
    <input type='radio' id='1X' name='factor' bind:group={factor} value={1} checked><label for='1X'>1X</label><input type='radio' id='1.5X' name='factor' bind:group={factor} value={1.5}><label for='1.5X'>1.5X</label><input type='radio' id='2X' name='factor' bind:group={factor} value={2}><label for='2X'>2X</label><input type='radio' id='3X' name='factor' bind:group={factor} value={3}><label for='3X'>3X</label>
  </div>
</div>
<div class='intervals'>
  <div class='splits active'>
    <h3>Active Intervals</h3>
    <ul>
      {#each activeSplits as split, i}
        <li>{(i+1) + `) ` + split}</li>
      {/each}
    </ul>
  </div>
  <div class='splits rest'>
    <h3>Rest Intervals</h3>
    <ul>
      {#each restSplits as split, i}
        <li>{(i+1) + `) ` + split}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  h1 {
    text-align: center;
    text-transform: uppercase;
  }
  .time {
    margin: 1.5rem;
    font-size: 4rem;
  }
  .intervals {
    text-transform: uppercase;
  }
  .splits {
    display: inline-block;
    vertical-align: top;
    margin: 1rem;
  }
  .splits ul {
    padding: 0;
  }
  .splits li {
    list-style: none;
  }
  .total_time {
    font-size: 1.5rem;
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
  button:disabled {
    cursor: not-allowed;
    background-color: #7d7c7c !important;
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

  @media screen and (max-width: 1200px) {
    .controls {
      grid-template-columns: .05fr 1fr 1fr 1fr .05fr;
    }
  }
  @media screen and (max-width: 750px) {
    .rest_factor label, .rest_factor label:nth-child(3), .rest_factor label:last-child {
      border-radius: 0;
      min-width: 72px;
    }
    .rest_factor {
      grid-row: 1 / 3;
    }
    .time {
      margin: .8rem;
      font-size: 3rem;
    }
    .total_time {
      font-size: 1rem;
    }
    .splits {
      margin: .5rem;
    }
  }
</style>
