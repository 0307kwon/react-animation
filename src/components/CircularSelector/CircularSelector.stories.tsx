import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CircularSelector } from "./CircularSelector";

export default {
  title: "CircularSelector",
  component: CircularSelector,
} as ComponentMeta<typeof CircularSelector>;

export const Primary: ComponentStory<typeof CircularSelector> = () => (
  <CircularSelector
    onSelect={(idx) => {
      console.log(idx, "선택됨");
    }}
  >
    {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
      <div
        style={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        1
      </div>
    ))}
  </CircularSelector>
);
