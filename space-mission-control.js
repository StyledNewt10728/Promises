// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).
const oneTimeTasks = [];
let monitoringTaskId;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
  oneTimeTasks.push({ function: func, delay: delay });

  // TODO: Write a function named `addOneTimeTask` that accepts a function (`func`) and a delay (`delay`) as parameters. This function should add an object containing both parameters into the `oneTimeTasks` array.
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
  for (const oneTask of oneTimeTasks) {
    setTimeout(oneTask.function, oneTask.delay);
  }

  // TODO: Create a function named `runOneTimeTasks` that iterates over the `oneTimeTasks` array and uses `setTimeout` to schedule each task according to its delay.
}

// Task 4: Start Monitoring Function
function startMonitoring() {
  console.log("Starting monitoring of spacecraft...");

  monitoringTaskId = setInterval(function () {
    console.log("Monitoring in process, please hold...");

    const hullstrength =
      Math.random() * 100 > 5 ? "Stable" : "Unstable, immediate fixes needed";
    const onxygenLevels = Math.random() * 100; //Oxygen monitored in same way
    const communications =
      Math.random() > 0.05 ? "Communicatons enabled" : "Communications failed";
    console.log(
      `Hull Status: ${hullstrength} | Oxygen Level: ${onxygenLevels.toFixed(
        2
      )}% | Communications: ${communications}`
    );
  }, 2000);

  // TODO: Write a function named `startMonitoring` that uses `setInterval` to simulate continuous monitoring. This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
  clearInterval(monitoringTaskId);
  console.log("Monitoring Stopped");

  // TODO: Implement a function named `stopMonitoring` that stops the continuous monitoring by using `clearInterval` on `monitoringTaskId`.
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
  console.log(`${duration} seconds left until liftoff`);
  for (i = duration; i >= 0; i--) {
    console.log(`T-minus ${i} seconds left`);
    if (i === 0) {
      clearInterval(console.log("Liftoff!"));
    } else {
      setInterval(console.log(i), duration);
    }
  }

  // TODO: Create a function named `startCountdown` that takes a duration parameter. Use `setInterval` to decrease the countdown every second and print the remaining time. Use `clearInterval` to stop the countdown when it reaches zero, printing a "Liftoff!" message.
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
  startMonitoring();
  addOneTimeTask(function () {
    console.log("Pre-launch system check complete.");
  }, 5000);
  addOneTimeTask(stopMonitoring, 10000);
  addOneTimeTask(function () {
    startCountdown(10);
  }, 15000);
  runOneTimeTasks();
  // TODO: Use the functions you've created to schedule the pre-launch system check, start and stop monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a real mission timeline.
}

scheduleMission(); // Starts the mission.
