declare module "*.module.less" {
  const content: { [key: string]: string };

  export default content;
}

declare module "*.svg" {
  import React = require("react");

  const ReactComponent: React.FC<React.SVGProps<SVGElement>>;

  export default ReactComponent;
}
