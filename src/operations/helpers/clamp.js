const clamp = (val, min, max) => {
    return Math.max(min, Math.min(val, max));
  };

export default clamp;