import { useEffect } from "react";
import "../style/Message.css";

function Message({ index, message, removeMessage }) {
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

  return (
    <li className="message" data-index={index} onClick={handleClick}>
      {message}
    </li>
  );
}

export default Message;
