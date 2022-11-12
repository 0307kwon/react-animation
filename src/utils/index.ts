export const makeThrottle = (timeout: number) => {
  // 여러번 호출되어도 timeout당 한번 씩만 동작
  let timeoutId: NodeJS.Timeout | null = null;
  let isWaiting = false;
  let prevTime = 0;
  return (callback: () => void) => {
    if (isWaiting) return;

    const animationFrameCallback: FrameRequestCallback = (time) => {
      const diffTime = time - prevTime;

      if (diffTime > timeout) {
        callback();
        prevTime = time;
        isWaiting = false;
        return;
      }

      requestAnimationFrame(animationFrameCallback);
    };

    requestAnimationFrame(animationFrameCallback);

    isWaiting = true;
  };
};
