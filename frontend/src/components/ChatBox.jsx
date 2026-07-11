import { useState } from "react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const res = await api.post("/chat/", null, {
        params: { message: message },
      });

      setResponse(res.data.response);
      setMessage("");
    } catch (err) {
      console.log(err);
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
    <div>
      <div className="section-header">
        <div className="section-header__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="section-header__text">
          <span className="eyebrow">Assistant</span>
          <h2>AI Chat</h2>
        </div>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          )}
          Send
        </button>
      </div>
      <p className="chat-hint">Press Enter to send · Shift+Enter for a new line</p>

      <div className="response-label">
        <span className="response-label__dot" />
        AI Response
      </div>

      <div className={`response-box${response ? "" : " is-empty"}`}>
        {response ? (
          <ReactMarkdown>{response}</ReactMarkdown>
        ) : (
          "Your AI-generated summary will appear here."
        )}
      </div>
    </div>
  );
}

export default ChatBox;