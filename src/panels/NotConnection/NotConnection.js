import { Button, Panel, Text, Title } from "@vkontakte/vkui";

import "../Home/Home.css";

import {
  back,
  setActivePanel,
  setActivePopout,
  useRouter,
} from "@blumjs/router";
import { useStore } from "effector-react";
import { useCallback, useEffect } from "react";
import { PanelRoute, PopoutRoute, StoryRoute } from "../../constants/router";
import { $main, setActiveStory } from "../../core/main";
import "../../img/Fonts.css";

const NotConnection = ({ id }) => {
  const { appearance } = useStore($main);
  const { activePopout } = useRouter();

  useEffect(() => {
    let timerId = null;
    if (activePopout) {
      timerId = setTimeout(() => {
        back();
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [activePopout]);

  const updateOnlineStatus = useCallback(() => {
    if (navigator.onLine) {
      setActiveStory(StoryRoute.Single);
      setActivePanel(PanelRoute.Menu);
    } else {
      setActivePopout(PopoutRoute.Loading);
    }
  }, []);

  return (
    <Panel id={id}>
      <div
        style={{ background: appearance === "light" ? "#F7F7FA" : "#1D1D20" }}
      >
        <div
          className="not-Connection--main-div"
          style={{ marginRight: "auto", marginLeft: "auto", marginTop: 24 }}
        >
          <Title level="3" style={{ textAlign: "center", marginTop: 24 }}>
            √-1
          </Title>

          <Text
            className="result-getFriend-text"
            style={{ textAlign: "center" }}
          >
            Проверьте доступ к интернету и попробуйте снова
          </Text>

          <div className="result-task-button-div">
            <Button
              className="result-getFriend-button"
              onClick={updateOnlineStatus}
              style={{
                backgroundColor: appearance === "dark" ? "#293950" : "#F4F9FF",
                color: "#1984FF",
                borderRadius: 25,
                marginBottom: 24,
              }}
              mode="accent"
              size="l"
            >
              Обновить
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default NotConnection;
