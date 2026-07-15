import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedInteraction,
  setAIInteraction,
} from "../store/interactionSlice";
import api from "../services/api";
import ReactMarkdown from "react-markdown";

function ChatBox() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setSending(true);

    try {
      const res = await api.post("/chat/", null, {
        params: {
          message: userMessage,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.response,
        },
      ]);

      if (res.data.interaction) {
        const interaction = {
          id: null,
          hcp_id: "",
          doctor_name: res.data.interaction.doctor_name || "",
          discussion: res.data.interaction.discussion || "",
          products: res.data.interaction.products || "",
          interaction_date:
            res.data.interaction.interaction_date ||
            new Date().toISOString().split("T")[0],
        };

        dispatch(setAIInteraction(interaction));
        dispatch(setSelectedInteraction(interaction));
      }
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-header__icon">🤖</div>

        <div className="section-header__text">
          <span className="eyebrow">Assistant</span>
          <h2>AI Chat</h2>
        </div>
      </div>

      <div className="chat-history">
        {messages.length === 0 ? (
          <div className="response-box is-empty">
            Start chatting with the AI Assistant.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user"
                  ? "chat-message-user"
                  : "chat-message-ai"
              }`}
            >
              <strong>
                {msg.sender === "user" ? "You" : "AI"}
              </strong>

              <div style={{ marginTop: "6px" }}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-row">
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your interaction with the doctor..."
        />

        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={sending || !message.trim()}
        >
          {sending ? (
            <span className="spinner spinner--light" />
          ) : (
            "Send"
          )}
        </button>
      </div>

      <p className="chat-hint">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}

export default ChatBox;