A tiny long-press event handler for web pages with pure vanilla javascript. Support pc's mouse click and mobile's touch events.

# Improvements from this fork
The fork fixes some problems with the initial module, mostly touch inputs for mobile users.
The modifications allows mobile users to scroll on elements set for long-press, which wasn't possible previously. It also detects whether or not the user has scrolled AFTER the touch input, in which case it won't trigger the long-press event, to allow smooth and uninterrupted scrolling in a list with multiple elements set for long-press.
As a drawback of these modifications though, this module won't work with images, but it will work fine with text, buttons, divisions, etc...


# Install

Use this script tag to add the module to your website
```
<script async defer src="https://cdn.jsdelivr.net/gh/beedywool/web-long-press@latest/longpress.js"></script>
```

# Usage

**Html:**

```
<button class="long-press">Press Me Long..</button>
```

**Javascript:**

```
import LongPress from "web-long-press";

new LongPress({
  triggerClass: 'long-press', // default
  pressDelay: 800, // default
  eventName: 'longpress' // default
  bubbles: true // default
});
```

That's all. And when you press the button longer than `pressDelay` the `longpress` event will fire and bubbles up if you set bubbles to `true`. 

Then we can handle the `longpress` event like this:

```
document.addEventListener("longpress", (e) => {
  console.log(e.target, 'has been long pressed..');
});
```

## Multiple instances

We can have multiple LongPress instances to handle different long presses.

**Html:**

```
<button class="longpress-500">LongPress for 0.5s</button>
<button class="longpress-1000">LongPress for 1s</button>
```

**Javascript:**

```
new LongPress({
  triggerClass: 'longpress-500',
  pressDelay: 500,
  eventName: 'longpress500'
});

new LongPress({
  triggerClass: 'longpress-1000',
  pressDelay: 1000,
  eventName: 'longpress1000'
});

document.addEventListener("longpress500", (e) => {
  console.log(e.target, 'has been long pressed for 0.5ms');
});

document.addEventListener("longpress1000", (e) => {
  console.log(e.target, 'has been long pressed for 1s');
});
```

# API

## Options

name | type | description | default value |
-----|------|-------------|---------------|
triggerClass | string | Class for target elements to be long pressed | "long-press"
pressDelay  | number | The milliseconds a press should take to trigger the **long-press** event  | 800
eventName | string  | The custom event name for the **long-press** event  | "longpress"
bubbles | boolean | Should the **long-press** event bubbles up or not  | true
