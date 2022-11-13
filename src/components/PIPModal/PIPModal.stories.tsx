import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PIPModal } from "./PIPModal";

export default {
  title: "PIPModal",
  component: PIPModal,
} as ComponentMeta<typeof PIPModal>;

export const PipMode: ComponentStory<typeof PIPModal> = () => (
  <div
    style={{
      position: "relative",
      width: "90vw",
      height: "90vh",
      // background: "gray",
      background: `linear-gradient(120deg, #ff00c7 0%, #51003f 100%),
      linear-gradient(120deg, #0030ad 0%, #00071a 100%),
      linear-gradient(180deg, #000346 0%, #ff0000 100%),
      linear-gradient(60deg, #0029ff 0%, #aa0014 100%),
      radial-gradient(100% 165% at 100% 100%, #ff00a8 0%, #00ff47 100%),
      radial-gradient(100% 150% at 0% 0%, #fff500 0%, #51d500 100%)`,
      backgroundBlendMode: `overlay, color-dodge, overlay, overlay, difference`,
    }}
  >
    <PIPModal
      pipRender={() => <div>이거지</div>}
      modalRender={{
        title: "내 플레이리스트 찾기",
        body: () => <div>모달</div>,
      }}
    />
  </div>
);

export const ModalMode: ComponentStory<typeof PIPModal> = () => (
  <div
    style={{
      position: "relative",
      width: "90vw",
      height: "90vh",
      // background: "gray",
      background: `linear-gradient(120deg, #ff00c7 0%, #51003f 100%),
      linear-gradient(120deg, #0030ad 0%, #00071a 100%),
      linear-gradient(180deg, #000346 0%, #ff0000 100%),
      linear-gradient(60deg, #0029ff 0%, #aa0014 100%),
      radial-gradient(100% 165% at 100% 100%, #ff00a8 0%, #00ff47 100%),
      radial-gradient(100% 150% at 0% 0%, #fff500 0%, #51d500 100%)`,
      backgroundBlendMode: `overlay, color-dodge, overlay, overlay, difference`,
    }}
  >
    <PIPModal
      pipRender={() => <div>이거지</div>}
      modalRender={{
        title: "내 플레이리스트 찾기",
        body: () => <div>모달</div>,
      }}
      isModalOpen={true}
    />
  </div>
);
