import InteractionForm from "./components/InteractionForm";
import ChatBox from "./components/ChatBox";
import InteractionList from "./components/InteractionList";

function App() {
  return (
    <div className="container">
      <header className="app-header">
        <div className="app-header__icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 0-4 4v1a5 5 0 0 0-3 4.58V16a4 4 0 0 0 4 4h1a3 3 0 0 0 6 0h1a4 4 0 0 0 4-4v-4.42A5 5 0 0 0 16 7V6a4 4 0 0 0-4-4Z" />
            <path d="M9 11h.01M15 11h.01" />
          </svg>
        </div>
        <div>
          <h1>AI-First CRM · HCP Module</h1>
          <p>Log, summarize, and manage healthcare provider interactions</p>
        </div>
      </header>

      <div className="card">
        <InteractionForm />
      </div>

      <div className="card">
        <ChatBox />
      </div>

      <div className="card">
        <InteractionList />
      </div>
    </div>
  );
}

export default App;