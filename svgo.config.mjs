// SVG optimization for logos in public/
export default {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Keep the viewBox: it scales the logo inside its layout box
          removeViewBox: false,
          convertPathData: { floatPrecision: 1, forceAbsolutePath: false },
          cleanupNumericValues: { floatPrecision: 1 },
        },
      },
    },
    "removeDimensions",
  ],
};
