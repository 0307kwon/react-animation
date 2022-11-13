import classNames from "classnames";
import { ReactNode, useCallback, useState } from "react";
import Xmark from "../../assets/xmark.svg";
import { CircularButton } from "../@common/CircularButton/CircularButton";
import classes from "./PIPModal.module.less";

type Props = {
  pipRender: () => ReactNode;
  modalRender: {
    title: string;
    body: () => ReactNode;
  };
  isModalOpen?: boolean;
};

const waitTimeForAnimationToModal = 800;

export const PIPModal = ({ pipRender, modalRender, isModalOpen }: Props) => {
  const [pipStatus, setPipStatus] = useState<
    "pip" | "animationToModal" | "modal" | "animationToPip"
  >(isModalOpen ? "modal" : "pip");

  const onClickOpenModal = useCallback(() => {
    setPipStatus("animationToModal");
    setTimeout(() => {
      setPipStatus("modal");
    }, waitTimeForAnimationToModal);
  }, []);

  const onClickCloseModal = useCallback(() => {
    setPipStatus("animationToPip");
    setTimeout(() => {
      setPipStatus("pip");
    }, waitTimeForAnimationToModal);
  }, []);

  return (
    <div className={classes.root}>
      {(pipStatus === "modal" || pipStatus === "animationToPip") && (
        <div
          className={classNames({
            [classes.modal]: true,
            [classes.animationToPip]: pipStatus === "animationToPip",
          })}
        >
          {pipStatus === "modal" && (
            <>
              <div
                className={classNames({
                  [classes.modalController]: true,
                })}
              >
                <h2>{modalRender.title}</h2>
                <CircularButton onClick={onClickCloseModal}>
                  <Xmark />
                </CircularButton>
              </div>
              {modalRender.body()}
            </>
          )}
        </div>
      )}
      {(pipStatus === "animationToModal" || pipStatus === "pip") && (
        <div
          className={classNames({
            [classes.pip]: true,
            [classes.animationToModal]: pipStatus === "animationToModal",
          })}
          onClick={onClickOpenModal}
        >
          {pipStatus === "pip" && pipRender()}
        </div>
      )}
    </div>
  );
};
