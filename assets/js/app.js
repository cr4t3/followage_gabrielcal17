var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

let TIME_GOAL = 0 * 1000;

let ticking_queue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const shuffle = (array) => { 
  return array.sort(() => Math.random() - 0.5); 
}; 
ticking_queue = shuffle(ticking_queue);
let last_delta = 0;

function getRemainingTime() {
  let delta = Math.abs(TIME_GOAL - new Date().getTime()) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = Math.floor(delta % 60);

  return {
    delta,
    days,
    hours,
    minutes,
    seconds,
    text: days + "d " + hours + "h " + minutes + "m " + seconds + "s ",
  };
}

function fixValue(value) {
  let asStr = `${value}`;
  if (asStr.length == 1) {
    asStr = "0" + asStr;
  }
  return asStr;
}

function renderValue(selector, value) {
  document.querySelector(selector).innerText = fixValue(value);
}

function tick_sound() {
  const x = ticking_queue[0];
  ticking_queue.shift();
  const y = new Audio("/assets/audio/" + x + ".mp3")
  y.play();
  ticking_queue.push(x)
}

function renderTime() {
  const { delta, days, hours, minutes, seconds, text } = getRemainingTime();

  if (delta != last_delta){
    tick_sound();

    renderValue("#days", days);
    renderValue("#hours", hours);
    renderValue("#minutes", minutes);
    renderValue("#seconds", seconds);

    console.log("[Time] " + text);
    last_delta = delta;  
  }
}

function startTimer(time) {
  TIME_GOAL = time * 1000;
  renderTime();
  setInterval(() => {
    renderTime();
  }, 1000);
}

window.addEventListener("load", () => {
  const config = "assets/particlesjs-config.json";
  particlesJS.load("particles-js", config, () => {
    console.log("particles.js config loaded");
  });
});


}