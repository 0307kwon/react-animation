import classNames from "classnames";
import { HTMLAttributes } from "react";
import classes from "./CircularButton.module.less";

type Props = HTMLAttributes<HTMLButtonElement>;

export const CircularButton = ({ className, ...options }: Props) => {
  return (
    <button
      className={classNames(className, classes.button)}
      {...options}
    ></button>
  );
};
