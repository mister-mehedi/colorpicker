// ./kernel.js

export const kernelFunction = function (width, height, hue) {
  const i = this.thread.x;
  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;
  
  const normalizedX = x / width;
  const normalizedY = y / height;


  // Compute color values based on position and hue
  const saturation = 1 - normalizedX; // Horizontal gradient from white to primary color
  const brightness = 1 - normalizedY; // Vertical gradient from white to black

  // Convert hue, saturation, and brightness to RGB
  const c = brightness * saturation;
  const xValue = c * (1 - Math.abs((hue * 6) % 2 - 1));
  const m = brightness - c;
  let r = 0, g = 0, b = 0;

  if (hue >= 0 && hue < 1 / 6) {
    r = c; g = xValue; b = 0;
  } else if (hue >= 1 / 6 && hue < 2 / 6) {
    r = xValue; g = c; b = 0;
  } else if (hue >= 2 / 6 && hue < 3 / 6) {
    r = 0; g = c; b = xValue;
  } else if (hue >= 3 / 6 && hue < 4 / 6) {
    r = 0; g = xValue; b = c;
  } else if (hue >= 4 / 6 && hue < 5 / 6) {
    r = xValue; g = 0; b = c;
  } else if (hue >= 5 / 6 && hue <= 1) {
    r = c; g = 0; b = xValue;
  }

  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;

  // Handle each channel separately
  if (channel === 0) return r;      // Red channel
  if (channel === 1) return g;      // Green channel
  if (channel === 2) return b;      // Blue channel
  if (channel === 3) return 255;    // Alpha channel (opaque)
};
