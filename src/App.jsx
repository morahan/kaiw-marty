import { useState, useEffect } from 'react'
import './App.css'

// Tab components
const HealthTab = () => (
  <div className="tab-content">
    <h2>🌙 Health</h2>
    <div className="cards">
      <div className="card score-card">
        <div className="score-circle sleep">
          <span className="score">85</span>
          <span className="label">Sleep</span>
        </div>
      </div>
      <div className="card score-card">
        <div className="score-circle readiness">
          <span className="score">78</span>
          <span className="label">Ready</span>
        </div>
      </div>
      <div className="card score-card">
        <div className="score-circle hrv">
          <span className="score">42</span>
          <span className="label">HRV</span>
        </div>
      </div>
      <div className="card">
        <h3>Activity</h3>
        <div className="stat">
          <span className="value">8,432</span>
          <span className="label">Steps</span>
        </div>
        <div className="stat">
          <span className="value">2,156</span>
          <span className="label">Calories</span>
        </div>
      </div>
    </div>
  </div>
)

const FamilyTab = () => (
  <div className="tab-content">
    <h2>👨‍👩‍👧‍👦 Family</h2>
    <div className="cards family-cards">
      <div className="card family-card">
        <div className="avatar melissa">M</div>
        <div className="info">
          <h3>Melissa</h3>
          <p className="birthday">🎂 Sep 1</p>
        </div>
      </div>
      <div className="card family-card">
        <div className="avatar elora">E</div>
        <div className="info">
          <h3>Elora</h3>
          <p className="birthday">🎂 Aug 27</p>
          <p className="age">~5 years</p>
        </div>
      </div>
      <div className="card family-card">
        <div className="avatar iris">I</div>
        <div className="info">
          <h3>Iris</h3>
          <p className="birthday">🎂 Jan 30</p>
          <p className="age">~2 years</p>
        </div>
      </div>
      <div className="card family-card">
        <div className="avatar lola">L</div>
        <div className="info">
          <h3>Lola</h3>
          <p className="birthday">🎂 Jan 1</p>
        </div>
      </div>
    </div>
  </div>
)

const BusinessTab = () => (
  <div className="tab-content">
    <h2>⚡ Business</h2>
    <div className="cards">
      <div className="card">
        <h3>📋 Pending Tasks</h3>
        <ul className="task-list">
          <li className="task high">Review article drafts</li>
          <li className="task">Approve social calendar</li>
          <li className="task">Check competitor intel</li>
        </ul>
      </div>
      <div className="card">
        <h3>📈 Metrics</h3>
        <div className="stat-row">
          <span>Articles this week:</span>
          <span className="value">3</span>
        </div>
        <div className="stat-row">
          <span>Social scheduled:</span>
          <span className="value">7</span>
        </div>
      </div>
    </div>
  </div>
)

const TeamTab = () => (
  <div className="tab-content">
    <h2>🤖 Team</h2>
    <div className="cards team-cards">
      {[
        { name: 'Marty', status: 'online', emoji: '⚡' },
        { name: 'Aria', status: 'online', emoji: '🎵' },
        { name: 'Renzo', status: 'online', emoji: '🔥' },
        { name: 'Kaia', status: 'online', emoji: '🌊' },
        { name: 'Thea', status: 'online', emoji: '🏛️' },
        { name: 'Badger', status: 'online', emoji: '🦡' },
        { name: 'Greta', status: 'offline', emoji: '📚' },
        { name: 'Maverick', status: 'online', emoji: '🚦' },
        { name: 'Freq', status: 'online', emoji: '🎛️' },
        { name: 'Quanta', status: 'online', emoji: '⏱️' },
        { name: 'Reno', status: 'offline', emoji: '📊' },
      ].map(agent => (
        <div key={agent.name} className={`card agent-card ${agent.status}`}>
          <span className="agent-emoji">{agent.emoji}</span>
          <span className="agent-name">{agent.name}</span>
          <span className={`status-dot ${agent.status}`}></span>
        </div>
      ))}
    </div>
  </div>
)

const ActionsTab = () => (
  <div className="tab-content">
    <h2>🎯 Action Items</h2>
    <div className="cards">
      <div className="card action-card urgent">
        <span className="priority">🔴 Urgent</span>
        <p>Review pending article approvals</p>
      </div>
      <div className="card action-card">
        <span className="priority">🟡 Today</span>
        <p>Check Oura ring - recovery low</p>
      </div>
      <div className="card action-card">
        <span className="priority">🟢 This Week</span>
        <p>Plan weekend family activity</p>
      </div>
    </div>
  </div>
)

function App() {
  const [activeTab, setActiveTab] = useState('health')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const tabs = [
    { id: 'health', label: 'Health', icon: '🌙' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'business', label: 'Business', icon: '⚡' },
    { id: 'team', label: 'Team', icon: '🤖' },
    { id: 'actions', label: 'Actions', icon: '🎯' },
  ]

  return (
    <div className="app">
      <header>
        <h1>🎵 Aria</h1>
        <p className="subtitle">Personal Dashboard</p>
        <p className="time">{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
      </header>
      
      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main>
        {activeTab === 'health' && <HealthTab />}
        {activeTab === 'family' && <FamilyTab />}
        {activeTab === 'business' && <BusinessTab />}
        {activeTab === 'team' && <TeamTab />}
        {activeTab === 'actions' && <ActionsTab />}
      </main>
    </div>
  )
}

export default App
