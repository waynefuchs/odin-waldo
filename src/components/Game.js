import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Crosshair from "./Crosshair";
import GameFooter from "./GameFooter";
import HighscoreList from "./HighscoreList";
import Messages from "./Messages";
import NewHighscore from "./NewHighscore";
import ObjectCounter from "./ObjectCounter";
import ObjectPopOut from "./ObjectPopOut";
import Stopwatch from "./Stopwatch";

import "../style/Colors.css";
import "../style/Image.css";

function createCoordinateObject(x, y) {
  return { x, y };
}

// pythagorean theorem
const isClickCloseEnough = (clickCoord, hiddenObject) => {
  return (
    (clickCoord.y - hiddenObject.y) ** 2 +
      (clickCoord.x - hiddenObject.x) ** 2 <
    hiddenObject.distance ** 2
  );
};

function Game({ puzzle }) {
  //////////////////////////////////////////////////////////////////////////////
  // Variable Definition
  const undefinedCoordinates = createCoordinateObject(undefined, undefined);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(undefined);
  const [isCrosshairVisible, setIsCrosshairVisible] = useState(false);
  const [crosshairCoordinates, setCrosshairCoordinates] =
    useState(undefinedCoordinates);
  const [pixelCoordinates, setPixelCoordinates] =
    useState(undefinedCoordinates);
  const [searchList, setSearchList] = useState([]);
  const [isPopOutVisible, setIsPopOutVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newHighscoreOpen, setNewHighscoreOpen] = useState(false);
  const [highscoreOpen, setHighscoreOpen] = useState(false);

  //////////////////////////////////////////////////////////////////////////////
  // Set-up
  async function fetchSearch(id) {
    const searchRef = collection(db, `puzzles/${id}/search`);
    const searchSnap = await getDocs(searchRef);
    const searchObj = searchSnap.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );
    setSearchList(searchObj);
  }

  // TODO: Investigate the proper way to do this
  // Check to see if the player won every time "searchList" is updated
  useEffect(() => {
    handleWinCondition();
    // eslint-disable-next-line
  }, [searchList]);

  // Handle fetching search data
  useEffect(() => {
    if (!puzzle?.id) return;
    fetchSearch(puzzle?.id);
  }, [puzzle?.id]);

  //////////////////////////////////////////////////////////////////////////////
  // Functions
  function addMessage(message) {
    setMessages([...messages, message]);
  }

  function makeGuess(objectId) {
    const hiddenObject = searchList.find((i) => i.id === objectId);
    if (!hiddenObject) return;
    const isCorrect = isClickCloseEnough(pixelCoordinates, hiddenObject);

    setUIDefaults();

    if (!isCorrect) {
      addMessage("That doesn't seem correct. Please try again!");
      return;
    }

    addMessage(`You found the '${hiddenObject.label}' object!`);
    setSearchList(
      searchList.map((i) => (i.id === objectId ? { ...i, isFound: true } : i))
    );
  }

  function handleWinCondition() {
    if (!searchList || searchList.length <= 0) return;
    const stillLookingFor = searchList.filter((i) => !i.isFound);
    if (stillLookingFor.length > 0) return;

    // Player won
    setTimeEnd(new Date());
    addMessage("You won!");
    // setHighscoreOpen(true);
    setIsGameOver(true);
    setNewHighscoreOpen(true);
  }

  function calculateCrosshairCoordinates(e) {
    if (isGameOver) return;

    if (isCrosshairVisible) {
      setUIDefaults();
      return;
    }

    // Enable the pop-out menu
    setIsPopOutVisible(true);

    // Calculate x/y position to place crosshair
    const documentCoordinates = {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    };
    setIsCrosshairVisible(true);
    setCrosshairCoordinates(documentCoordinates);

    // Calcualte corresponding x/y pixel coordinates in image
    const pixelCoords = {
      x: Math.floor(
        (e.clientX - e.target.x) *
          (e.target.naturalWidth / e.target.clientWidth)
      ),
      y: Math.floor(
        (e.clientY - e.target.y) *
          (e.target.naturalHeight / e.target.clientHeight)
      ),
    };
    setPixelCoordinates(pixelCoords);
  }

  function setUIDefaults() {
    setIsPopOutVisible(false);
    setIsCrosshairVisible(false);
    setCrosshairCoordinates(createCoordinateObject(undefined, undefined));
  }

  function togglePopOut() {
    setIsPopOutVisible(!isPopOutVisible);
  }

  function removeMessage(index) {
    setMessages(messages.filter((m, i) => i !== Number(index)));
  }

  function newHighscoreSubmitted() {
    setNewHighscoreOpen(false);
    setHighscoreOpen(true);
  }

  function resetGame() {
    setIsGameOver(false);
    setTimeStart(new Date());
    setTimeEnd(undefined);
    setIsCrosshairVisible(false);
    setCrosshairCoordinates(undefinedCoordinates);
    setPixelCoordinates(undefinedCoordinates);
    setIsPopOutVisible(false);
    setMessages([]);
    setNewHighscoreOpen(false);
    setHighscoreOpen(false);
    fetchSearch(puzzle?.id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Component Output
  return (
    <>
      <NewHighscore
        isGameOver={isGameOver}
        newHighscoreOpen={newHighscoreOpen}
        time={timeEnd - timeStart}
        onClose={newHighscoreSubmitted}
      />

      <HighscoreList open={highscoreOpen} resetGame={resetGame} />

      <Messages messages={messages} removeMessage={removeMessage} />

      <Stopwatch key={timeStart} isGameOver={isGameOver} />

      <ObjectCounter searchList={searchList} onClick={togglePopOut} />

      <Crosshair
        id={puzzle?.id}
        isVisible={isCrosshairVisible}
        coord={crosshairCoordinates}
      />

      <ObjectPopOut
        searchList={searchList}
        isVisible={isPopOutVisible}
        isCrosshairVisible={isCrosshairVisible}
        onMakeGuess={makeGuess}
        onClose={togglePopOut}
      />

      <img
        className="image-map"
        src={puzzle.src}
        alt={puzzle.alt}
        onClick={calculateCrosshairCoordinates}
      />

      <GameFooter credit={puzzle} />
    </>
  );
}

export default Game;
