// Counter.stories.js

import React from "react";
import Counter from "./Counter";

export default {
  title: "Counter", // The title of your storybook section
  component: Counter, // The component you want to showcase
};



export const Default = () => (
  <Counter initialValue={0} />
);

export const WithInitialValue = () => (
  <Counter initialValue={10} />
);

export const WithLargeInitialValue = () => (
  <Counter initialValue={100} />
);



// Additional Details
Default.parameters = {
  controls: { hideNoControlsWarning: false }, // Hide the controls panel
};

WithInitialValue.parameters = {
  controls: { hideNoControlsWarning: true }, // Hide the controls panel
};

WithLargeInitialValue.parameters = {
  controls: { hideNoControlsWarning: true }, // Hide the controls panel
};