import { ReactElement, ReactNode } from "react";
import classes from "./CircularSelector.module.less";

export interface Props {
  children: ReactNode[];
}

const CircularSelector = ({ children }: Props) => {
  const deg = 360 / children.length;
  const offset = 2;

  return (
    <div className={classes.root}>
      {children.map((child, idx) => {
        const element = child as unknown as ReactElement;
        element.props.style.transformOrigin = "center";
        element.props.style.rotate = `-${idx * deg}deg`;

        return (
          <div
            style={{
              background: `conic-gradient(cornflowerblue ${
                deg / 2 - offset
              }deg, transparent ${deg / 2 - offset}deg ${
                360 - deg / 2
              }deg, cornflowerblue ${360 - deg / 2}deg)`,
              rotate: `${idx * deg}deg`,
            }}
          >
            <div>{child}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CircularSelector;
