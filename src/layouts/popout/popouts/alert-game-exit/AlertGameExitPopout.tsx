import { back, setActivePanel } from "@blumjs/router";
import { Alert } from "@vkontakte/vkui";
import { useStore } from "effector-react";
import { memo, useCallback } from "react";
import { PanelRoute, StoryRoute } from "../../../../constants/router";
import {
  $main,
  setActiveStory,
  setConnectType,
  setLeavingRoom,
} from "../../../../core/main";
import { leaveRoom } from "../../../../sockets/game";

export const AlertGameExitPopout = memo(() => {
  const { joinCode } = useStore($main);
  const handleClose = useCallback(() => {
    back();
  }, []);
  const handleAction = useCallback(() => {
    back({
      afterBackHandledCallback: () => {
        setLeavingRoom(true);
        setConnectType("host");
        if (joinCode) {
          leaveRoom(joinCode);
        }
        setActivePanel(PanelRoute.Menu);
        setActiveStory(StoryRoute.Single);
      },
    });
  }, [joinCode]);

  return (
    <Alert
      actions={[
        {
          title: "Завершить",
          mode: "destructive",
          action: handleAction,
        },
        {
          title: "Отмена",
          autoclose: true,
          mode: "cancel",
        },
      ]}
      actionsLayout="vertical"
      onClose={handleClose}
      header="Подтвердите действие"
      text="Вы уверены, что хотите завершить игру?"
    />
  );
});
