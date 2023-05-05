import Message from "./Message";

import "../style/Messages.css";

function Messages({ messages, removeMessage }) {
  return (
    <ul className="messages">
      {messages.map((m, index) => (
        <Message
          key={index}
          index={index}
          message={m}
          removeMessage={removeMessage}
        />
      ))}
    </ul>
  );
}

export default Messages;
