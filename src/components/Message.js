import { useStopwatch } from "react-timer-hook";

import "../style/Message.css";

function Message({ index, message, removeMessage }) {
  const autoClose = false;
  const autoCloseTimeout = 3;
  const stopwatch = useStopwatch({
    autoStart: true,
  });

  function handleClick(e) {
    try {
      removeMessage(e.target.dataset.index);
    } catch {
      console.error(
        "Message.js: removeMessage is not a function",
        removeMessage
      );
    }
  }

  // Set autoClose to true
  if (autoClose && stopwatch?.seconds >= autoCloseTimeout) {
    removeMessage(index);
  }

  return (
    <li className="message" data-index={index} onClick={handleClick}>
      <div className="message-data">{message}</div>
      <button
        className="close-message"
        data-index={index}
        onClick={handleClick}
      >
        X
      </button>
    </li>
  );
}

export default Message;
