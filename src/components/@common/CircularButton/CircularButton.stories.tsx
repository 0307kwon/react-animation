import Xmark from "@/assets/xmark.svg";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CircularButton } from "./CircularButton";

export default {
  title: "Button",
  component: CircularButton,
} as ComponentMeta<typeof CircularButton>;

export const Primary: ComponentStory<typeof CircularButton> = () => (
  <CircularButton>
    <Xmark />
  </CircularButton>
);
