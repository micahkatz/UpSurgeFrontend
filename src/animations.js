exports.FadeIn = (transitionInfo) => {
  const { progress, start, end } = transitionInfo;
  const opacityInterpolation = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [0, 0, 1, 1],
  });
  return { opacity: opacityInterpolation };
}
exports.FadeOut = (transitionInfo) => {
  const { progress, start, end } = transitionInfo;
  const opacityInterpolation = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [1, 1, 0, 0],
  });
  return { opacity: opacityInterpolation };
}
