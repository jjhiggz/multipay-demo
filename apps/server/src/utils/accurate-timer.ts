export function startAccurateTimer(callback: () => void, interval: number) {
  let expected = Date.now() + interval;

  function step() {
    const drift = Date.now() - expected;
    callback();

    expected += interval;
    setTimeout(step, Math.max(0, interval - drift));
  }

  setTimeout(step, interval);
}
