export const alert = (flagState, time, funct) => {
  flagState(true);
  setTimeout(() => {
    flagState(false);
    if (funct) {
      funct();
    }
  }, time * 1000);
};
