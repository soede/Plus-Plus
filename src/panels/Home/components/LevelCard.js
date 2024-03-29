import { useEffect, useMemo, useState } from "react";

import { back, setActivePanel, setActivePopout } from "@blumjs/router";
import {
  Icon16Done,
  Icon20BombOutline,
  Icon20RecentOutline,
  Icon24CheckCircleOutline,
  Icon24Play,
} from "@vkontakte/icons";
import { Button, Card, Text, Title } from "@vkontakte/vkui";
import { useStore } from "effector-react";
import { qsSign } from "../../../hooks/qs-sign";
import "../Home.css";

import { PanelRoute, PopoutRoute } from "../../../constants/router";
import { AX } from "../../../core/data/fetcher";
import { $main, setLvlNumber, setReady } from "../../../core/main";
import "../../../img/Fonts.css";

export const LevelCard = ({ number, devideLvl }) => {
  const { appearance, lvlsInfo, bestLvlsResult } = useStore($main);
  const [cardsStyle, setCardsStyle] = useState(null);

  const [thisLvl, setThisLvl] = useState(null);
  const [bestResult, setBestResult] = useState(null);

  function devideType() {
    switch (number) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
      case 6:
        return "six";
      case 7:
        return "seven";
      case 8:
        return "eight";
      case 9:
        return "nine";
      case 10:
        return "ten";
    }
  }

  useEffect(() => {
    try {
      let inf = lvlsInfo;
      let searchTerm = devideType(number);
      let findedLevel = inf?.find((lvl) => lvl.lvlType === searchTerm);
      if (findedLevel) {
        setThisLvl(findedLevel);
      }
    } catch (e) {
      console.log("lvlsInfo err", e);
    }
  }, [lvlsInfo]);
  useEffect(() => {
    if (bestLvlsResult) {
      const lvlType = devideType();
      const lvl = bestLvlsResult.find((l) => l.lvlType === lvlType);
      if (lvl) {
        setBestResult({
          seconds:
            String(lvl.bestTime.seconds).length === 1
              ? `0${lvl.bestTime.seconds}`
              : String(lvl.bestTime.seconds),
          milliseconds:
            String(lvl.bestTime.milliseconds).length === 1
              ? `00${lvl.bestTime.milliseconds}`
              : String(lvl.bestTime.milliseconds).length === 2
              ? `0${lvl.bestTime.milliseconds}`
              : String(lvl.bestTime.milliseconds),
        });
      }
    }
  }, [bestLvlsResult]);

  useEffect(() => {
    const pageWidth = document.documentElement.scrollWidth;
    if (pageWidth > 350) {
      setCardsStyle("max");
    } else {
      setCardsStyle("min");
    }
  }, []);

  async function mapingLvls() {
    setActivePopout(PopoutRoute.Loading);
    const promise = new Promise((resolve, reject) => {
      lvlsInfo &&
        lvlsInfo.map((item, index) => {
          if (item.lvlType === devideType(number)) {
            try {
              AX.delete(`/api/plus-plus/lvl/${item.id}${qsSign}`)
                .then(async function (response) {
                  setReady(true);
                })
                .catch(function () {});
            } catch (e) {}
          }
        });
      resolve();
    });

    promise.then(() =>
      back({
        afterBackHandledCallback: () => {
          setActivePanel(PanelRoute.LvlGame);
        },
      })
    );
  }

  const isCompleted = useMemo(() => !!bestResult, [bestResult]);

  return (
    <div
      className={
        cardsStyle && cardsStyle === "max"
          ? "lvl-card-div"
          : "lvl-card-div-mini"
      }
    >
      <Card
        className="home--level_card"
        style={{
          backgroundColor: appearance === "dark" ? "#2C2C31" : "#FFFFFF",
          borderRadius: 24,
        }}
        key={number}
      >
        <div className="lvl-card">
          <div style={{ width: 60, height: 60 }}>
            <Title
              level="1"
              className="lvl-card-title"
              style={{
                paddingLeft: 16,
                paddingTop: 16,
                color: appearance === "dark" ? "#E1E3E6" : "#000000",
              }}
            >
              #{number}
            </Title>
          </div>

          <div className="lvl-card-icon-div" style={{ marginTop: -48 }}>
            {isCompleted && (
              <Icon16Done
                className="lvl-card-icon"
                style={{
                  backgroundColor:
                    appearance === "dark" ? "#293950" : "#F4F9FF",
                }}
              />
            )}
          </div>

          <div style={{ paddingTop: 1 }}>
            <div
              className="lvl-card-parametr-div"
              style={{ width: 141, height: 30, paddingLeft: 16 }}
            >
              <Icon24CheckCircleOutline
                className="lvl-card-parametr-icon"
                style={{ display: "inline-block" }}
                width={20}
                height={20}
              />
              <Text
                className="lvl-card-parametr-text"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  paddingLeft: 5,
                }}
              >
                {devideLvl(number)[1]}
              </Text>
            </div>
            <div
              className="lvl-card-parametr-div"
              style={{ width: 141, height: 30, paddingLeft: 16 }}
            >
              <Icon20BombOutline
                className="lvl-card-parametr-icon"
                style={{ display: "inline-block" }}
                width={20}
                height={20}
              />
              <Text
                className="lvl-card-parametr-text"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  paddingLeft: 5,
                }}
              >
                {devideLvl(number)[0]}
              </Text>
            </div>

            <div
              className="lvl-card-parametr-div"
              style={{ width: 141, height: 30, paddingLeft: 16 }}
            >
              <Icon20RecentOutline
                className="lvl-card-parametr-icon"
                style={{ display: "inline-block" }}
                width={20}
                height={20}
              />
              <Text
                className={`lvl-card-parametr-text ${
                  bestResult ? "appear_trigger" : ""
                }`}
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  paddingLeft: 5,
                }}
              >
                {bestResult
                  ? `${bestResult.seconds}:${bestResult.milliseconds}`
                  : "--:--"}
              </Text>
            </div>
          </div>

          <Button
            className={
              thisLvl && thisLvl.rightResults === thisLvl.totalResults
                ? "button-lvl-complete"
                : "button-lvl"
            }
            style={{
              backgroundColor: appearance === "dark" ? "#293950" : "#F4F9FF",
              color: "#1984FF",
              borderRadius: 25,
            }}
            onClick={async function () {
              await setLvlNumber(number);
              await mapingLvls();
            }}
            before={<Icon24Play height={16} width={16} />}
            mode="accent"
            size="s"
          >
            {isCompleted ? "Перепройти" : "Играть"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
