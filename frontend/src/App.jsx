import InteractionForm from "./components/InteractionForm";
import ChatBox from "./components/ChatBox";
import InteractionList from "./components/InteractionList";

function App() {
  return (
    <div className="container">

      <header className="app-header">
        <div className="app-header__icon">🩺</div>

        <div>
          <h1>AI-Powered HCP CRM</h1>
          <p>
            AI-First CRM · HCP Module
            <br />
            Log, summarize and manage healthcare provider interactions
          </p>
        </div>
      </header>

      {/* Two Column Layout */}

      <div className="dashboard-layout">

        <div className="left-panel">
          <div className="card form-card">
            <InteractionForm />
          </div>
        </div>

        <div className="right-panel">
          <div className="card chat-card">
            <ChatBox />
          </div>
        </div>

      </div>

      {/* Interaction History */}

      <div className="card history-card">
        <InteractionList />
      </div>

    </div>
  );
}

export default App;