import { Platform } from "@vkontakte/vkui";
import { createStore } from "effector";
import { StoryRoute } from "../../constants/router";
import { Appearance, ConnectType, GameInfo } from "../../types";
import {
  setActiveStory,
  setAllTasks,
  setAnswer,
  setAnswerInfo,
  setAppeareance,
  setCompleteLvl,
  setConnectType,
  setCountPoints,
  setFirstStart,
  setGameExists,
  setGameInfo,
  setHaveHash,
  setItNeedRestartGame,
  setJoinCode,
  setLeavingRoom,
  setLocalTask,
  setLvlData,
  setLvlNumber,
  setLvlResult,
  setLvlsInfo,
  setMpGameResults,
  setNotAdd,
  setPanelsHistory,
  setPlatform,
  setPlayerLobbyList,
  setPlayersId,
  setReady,
  setSingleType,
  setTaskInfo,
  setTimeFinish,
  setUser,
} from "./events";

type Store = {
  appearance: Appearance;
  activeStory: StoryRoute;
  user: any;
  platform: Platform;
  countPoints: number;
  gameInfo: GameInfo;
  taskInfo: any;
  answerInfo: any;
  joinCode: null | string;
  mpGameResults: any[];
  playersId: number[];
  isFirstStart: boolean;
  playerLobbyList: any[];
  connectType: ConnectType;
  itNeedRestartGame: boolean;
  notAdd: boolean;
  leavingRoom: any;
  haveHash: string;
  panelsHistory: any[];
  singleType: any;
  localTask: any;
  lvlsInfo: any;
  timeFinish: number;
  isReady: boolean;
  lvlNumber: number;
  completeLvl: any;
  allTasks: any[];
  lvlResult: {
    id: any;
    lvlType: any;
    answers: any[];
  };
  answer: {
    id: any;
    lvlType: any;
    answers: any[];
  };
  lvlData: any;
  gameExists: boolean;
};

export const $main = createStore<Store>({
  appearance: "light",
  activeStory: StoryRoute.Single,
  user: null,
  platform: Platform.ANDROID,
  countPoints: 0,
  gameInfo: {
    roomId: "",
    taskId: "",
  },
  taskInfo: null,
  answerInfo: null,
  joinCode: null,
  mpGameResults: [],
  playersId: [],
  isFirstStart: false,
  playerLobbyList: [],
  connectType: "host",
  itNeedRestartGame: false,
  notAdd: false,
  leavingRoom: null,
  haveHash: "",
  panelsHistory: [],
  singleType: null,
  localTask: null,
  lvlsInfo: null,
  timeFinish: 0,
  isReady: false,
  lvlNumber: 0,
  completeLvl: null,
  allTasks: [],
  lvlResult: {
    id: null,
    lvlType: null,
    answers: [],
  },
  answer: {
    id: null,
    lvlType: null,
    answers: [],
  },
  lvlData: null,
  gameExists: false,
})
  .on(setAppeareance, (state, appearance) => ({
    ...state,
    appearance,
  }))
  .on(setActiveStory, (state, activeStory) => ({
    ...state,
    activeStory,
  }))
  .on(setUser, (state, user) => ({
    ...state,
    user,
  }))
  .on(setPlatform, (state, platform) => ({
    ...state,
    platform,
  }))
  .on(setCountPoints, (state, countPoints) => ({
    ...state,
    countPoints,
  }))
  .on(setGameInfo, (state, gameInfo) => ({
    ...state,
    gameInfo,
  }))
  .on(setTaskInfo, (state, taskInfo) => ({
    ...state,
    taskInfo,
  }))
  .on(setAnswerInfo, (state, answerInfo) => ({
    ...state,
    answerInfo,
  }))
  .on(setJoinCode, (state, joinCode) => ({
    ...state,
    joinCode,
  }))
  .on(setMpGameResults, (state, mpGameResults) => ({
    ...state,
    mpGameResults,
  }))
  .on(setPlayersId, (state, playersId) => ({
    ...state,
    playersId,
  }))
  .on(setFirstStart, (state, isFirstStart) => ({
    ...state,
    isFirstStart,
  }))
  .on(setPlayerLobbyList, (state, playerLobbyList) => ({
    ...state,
    playerLobbyList,
  }))
  .on(setConnectType, (state, connectType) => ({
    ...state,
    connectType,
  }))
  .on(setItNeedRestartGame, (state, itNeedRestartGame) => ({
    ...state,
    itNeedRestartGame,
  }))
  .on(setNotAdd, (state, notAdd) => ({
    ...state,
    notAdd,
  }))
  .on(setLeavingRoom, (state, leavingRoom) => ({
    ...state,
    leavingRoom,
  }))
  .on(setHaveHash, (state, haveHash) => ({
    ...state,
    haveHash,
  }))
  .on(setPanelsHistory, (state, panelsHistory) => ({
    ...state,
    panelsHistory,
  }))
  .on(setSingleType, (state, singleType) => ({
    ...state,
    singleType,
  }))
  .on(setLocalTask, (state, localTask) => ({
    ...state,
    localTask,
  }))
  .on(setLvlsInfo, (state, lvlsInfo) => ({
    ...state,
    lvlsInfo,
  }))
  .on(setTimeFinish, (state, timeFinish) => ({
    ...state,
    timeFinish,
  }))
  .on(setReady, (state, isReady) => ({
    ...state,
    isReady,
  }))
  .on(setLvlNumber, (state, lvlNumber) => ({
    ...state,
    lvlNumber,
  }))
  .on(setCompleteLvl, (state, completeLvl) => ({
    ...state,
    completeLvl,
  }))
  .on(setAllTasks, (state, allTasks) => ({
    ...state,
    allTasks,
  }))
  .on(setLvlResult, (state, lvlResult) => ({
    ...state,
    lvlResult,
  }))
  .on(setAnswer, (state, answer) => ({
    ...state,
    answer,
  }))
  .on(setLvlData, (state, lvlData) => ({
    ...state,
    lvlData,
  }))
  .on(setGameExists, (state, gameExists) => ({
    ...state,
    gameExists,
  }));