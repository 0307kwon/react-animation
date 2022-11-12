import classNames from "classnames";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { makeThrottle } from "../../utils";
import classes from "./CircularSelector.module.less";

type Props = {
  children: ReactNode[];
  onSelect: (selectedItemIdx: number) => void;
  style?: {
    color: string;
  };
};

const cloneElement = (element: ReactElement): ReactElement => {
  return {
    ...element,
    props: { ...element.props, style: { ...element.props.style } },
  };
};
const defaultColor = "#BDBDBD";

const throttle = makeThrottle(40);

export const CircularSelector = ({ children, onSelect, style }: Props) => {
  const deg = 360 / children.length;
  const offset = 2;
  const [hoveredItemIdx, setHoveredItemIdx] = useState<null | number>(null);
  const [selectedItemIdx, setSelectedItemIdx] = useState<null | number>(null);

  // 영역을 나눠서 해당하는 영역에 클래스 추가
  // 중점과 마우스와의 각도를 계산
  const onMouseMoveCalculateDegree = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >((e) => {
    const element = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;

    const mousePositionRelativeToElement = {
      x: clientX - element.x,
      y: clientY - element.y,
    };

    // element의 중점과 마우스 위치의 각도를 계산
    const centerOfElement = {
      x: element.width / 2,
      y: element.height / 2,
    };

    const offsetBetweenCenterAndMouse = {
      x: mousePositionRelativeToElement.x - centerOfElement.x,
      y: mousePositionRelativeToElement.y - centerOfElement.y,
    };

    const radian = Math.atan(
      offsetBetweenCenterAndMouse.y / offsetBetweenCenterAndMouse.x
    );
    const degree =
      (radian * 180) / Math.PI +
      (offsetBetweenCenterAndMouse.x >= 0 ? 90 : 270);

    // 마우스가 x 중점에서 오른쪽에 있으면 + 90
    // 왼쪽에 있으면 + 270

    const elementAreas = children.map((_, idx) => {
      const middleDegree = idx * deg;
      const leftBoundary =
        middleDegree - deg / 2 < 0
          ? middleDegree - deg / 2 + 360
          : middleDegree - deg / 2;
      const rightBoundary = middleDegree + deg / 2;

      return [leftBoundary, rightBoundary];
    });

    const hoveredElementIdx = elementAreas.findIndex(
      ([leftBoundary, rightBoundary]) => {
        if (leftBoundary - rightBoundary > 180) {
          return degree > leftBoundary || degree <= rightBoundary;
        }

        return degree > leftBoundary && degree <= rightBoundary;
      }
    );

    // TODO: 쓰로틀 적용하기
    throttle(() => {
      setHoveredItemIdx(hoveredElementIdx ?? null);
    });
  }, []);

  const onClickSelectItem = useCallback(() => {
    if (hoveredItemIdx === null) return;

    setSelectedItemIdx(hoveredItemIdx);

    const waitingTimeForFinishAnimation = 500;
    setTimeout(() => {
      onSelect(hoveredItemIdx);
    }, waitingTimeForFinishAnimation);
  }, [hoveredItemIdx]);

  return (
    <div
      className={classes.root}
      onMouseMove={onMouseMoveCalculateDegree}
      onClick={onClickSelectItem}
    >
      {children.map((child, idx) => {
        const element = child as unknown as ReactElement;
        const newElement = cloneElement(element);
        newElement.props.style.transformOrigin = "center";
        newElement.props.style.rotate = `-${idx * deg}deg`;

        return (
          <div
            key={idx}
            className={classNames({
              [classes.hovered]: hoveredItemIdx === idx,
              [classes.selected]: selectedItemIdx === idx,
              [classes.finish]:
                selectedItemIdx !== idx && selectedItemIdx !== null,
            })}
            style={{
              background: `conic-gradient(${
                style?.color ? style.color : defaultColor
              } ${deg / 2 - offset}deg, transparent ${deg / 2 - offset}deg ${
                360 - deg / 2
              }deg, ${style?.color ? style.color : defaultColor} ${
                360 - deg / 2
              }deg)`,
              rotate: `${idx * deg}deg`,
            }}
          >
            <div>{newElement}</div>
          </div>
        );
      })}
    </div>
  );
};
