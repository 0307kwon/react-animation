import { ComponentMeta, ComponentStory } from "@storybook/react";
import CircularSelector from "./CircularSelector";

export default {
  title: "CircularSelector",
  component: CircularSelector,
} as ComponentMeta<typeof CircularSelector>;

export const Primary: ComponentStory<typeof CircularSelector> = () => (
  <CircularSelector>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </CircularSelector>
);
