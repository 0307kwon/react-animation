import { ReactNode } from "react";
import classes from "./CircularSelector.module.less";

export interface Props {
  children: ReactNode;
}

const CircularSelector = ({ children }: Props) => {
  return (
    <div className={classes.root}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CircularSelector;
