import { useState, useEffect } from 'react'
import './App.css'

// Marty-specific theme colors
const MartyTheme = {
  primary: '#00d4ff',
  secondary: '#ff6b35',
  accent: '#00d4ff',
}

// Data fetching helpers (simulated for now - would connect to real APIs)
const fetchTeamStatus = async () => {
  // This would call sessions_list API
  return [
    { name: 'Marty', status: 'online', emoji: '⚡', role: 'Lead' },
    { name: 'Aria', status: 'online', emoji: '🎵', role: 'Health' },
    { name: 'Renzo', status: 'online', emoji: '🔥', role: 'Content' },
    { name: 'Kaia', status: 'online', emoji: '🌊', role: 'Trends' },
    { name: 'Thea', status: 'online', emoji: '🏛️', role: 'Reviews' },
    { name: 'Badger', status: 'online', emoji: '🦡', role: 'Mode Switch' },
    { name: 'Greta', status: 'online', emoji: '📚', role: 'Tasks' },
    { name: 'Maverick', status: 'online', emoji: '🚦', role: 'Queue' },
    { name: 'Freq', status: 'online', emoji: '🎛️', role: 'Audio' },
    { name: 'Quanta', status: 'online', emoji: '⏱️', role: 'Metrics' },
    { name: 'Reno', status: 'online', emoji: '📊', role: 'Crypto' },
  ]
}

const fetchWorkoutFlowMetrics = async () => {
  // This would connect to Notion/analytics
  return {
    articlesToday: 2,
    articlesWeek: 12,
    socialScheduled: 8,
    pendingReviews: 3,
    activeSessions: 11,
  }
}

const fetchActiveTasks = async () => {
  // This would query Linear/Todoist
  return [
    { id: 1, text: 'Morning briefing delivery', priority: 'urgent', agent: 'Marty' },
    { id: 2, text: 'Article review for Thea', priority: 'high', agent: 'Thea' },
    { id: 3, text: 'Trend scan for Kaia', priority: 'medium', agent: 'Kaia' },
    { id: 4, text: 'NATIX market scan', priority: 'low', agent: 'Reno' },
  ]
}

// Tab Components
const OverviewTab = ({ metrics, tasks, team }) => (
  <div className="tab-content">
    <h2>⚡ Overview</h2>
    <div className="overview-grid">
      <div className="card metric-card">
        <div className="metric-icon">📝</div>
        <div className="metric-value">{metrics.articlesToday}</div>
        <div className="metric-label">Articles Today</div>
      </div>
      <div className="card metric-card">
        <div className="metric-icon">📅</div>
        <div className="metric-value">{metrics.articlesWeek}</div>
        <div className="metric-label">This Week</div>
      </div>
      <div className="card metric-card">
        <div className="metric-icon">🐦</div>
        <div className="metric-value">{metrics.socialScheduled}</div>
        <div className="metric-label">Social Scheduled</div>
      </div>
      <div className="card metric-card">
        <div className="metric-icon">👀</div>
        <div className="metric-value">{metrics.pendingReviews}</div>
        <div className="metric-label">Pending Reviews</div>
      </div>
    </div>
    
    <div className="card" style={{ marginTop: '1rem' }}>
      <h3>🎯 Priority Tasks</h3>
      <div className="priority-tasks">
        {tasks.slice(0, 3).map(task => (
          <div key={task.id} className={`priority-task ${task.priority}`}>
            <span className={`priority-badge ${task.priority}`}>{task.priority.toUpperCase()}</span>
            <span className="task-text">{task.text}</span>
            <span className="task-agent">{task.agent}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TeamTab = ({ team }) => (
  <div className="tab-content">
    <h2>🤖 Team Status</h2>
    <div className="cards team-cards">
      {team.map(agent => (
        <div key={agent.name} className={`card agent-card ${agent.status}`}>
          <span className="agent-emoji">{agent.emoji}</span>
          <span className="agent-name">{agent.name}</span>
          <span className="agent-role">{agent.role}</span>
          <span className={`status-dot ${agent.status}`}></span>
        </div>
      ))}
    </div>
  </div>
)

const BusinessTab = ({ metrics }) => (
  <div className="tab-content">
    <h2>💼 Business</h2>
    <div className="cards">
      <div className="card">
        <h3>📈 Content Performance</h3>
        <div className="stat-row">
          <span>Articles this week:</span>
          <span className="value">{metrics.articlesWeek}</span>
        </div>
        <div className="stat-row">
          <span>Social posts:</span>
          <span className="value">{metrics.socialScheduled}</span>
        </div>
        <div className="stat-row">
          <span>Pending reviews:</span>
          <span className="value warning">{metrics.pendingReviews}</span>
        </div>
      </div>
      <div className="card">
        <h3>🎯 Active Focus</h3>
        <div className="focus-item">
          <span className="focus-emoji">📝</span>
          <span>Daily articles (2/day target)</span>
        </div>
        <div className="focus-item">
          <span className="focus-emoji">🐦</span>
          <span>X engagement & growth</span>
        </div>
        <div className="focus-item">
          <span className="focus-emoji">📺</span>
          <span>YouTube video production</span>
        </div>
      </div>
    </div>
  </div>
)

const TasksTab = ({ tasks }) => (
  <div className="tab-content">
    <h2>📋 Active Tasks</h2>
    <div className="cards">
      <div className="card task-card full-width">
        {tasks.map(task => (
          <div key={task.id} className={`task-row ${task.priority}`}>
            <span className={`priority-indicator ${task.priority}`}></span>
            <span className="task-text">{task.text}</span>
            <span className="task-agent">{task.agent}</span>
            <span className={`priority-label ${task.priority}`}>{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const ActionsTab = () => (
  <div className="tab-content">
    <h2>🎯 Action Items</h2>
    <div className="cards">
      <div className="card action-card urgent">
        <span className="priority">🔴 Urgent</span>
        <p>Review and approve pending articles</p>
      </div>
      <div className="card action-card">
        <span className="priority">🟡 Today</span>
        <p>Publish morning X post</p>
      </div>
      <div className="card action-card">
        <span className="priority">🟢 This Week</span>
        <p>Record YouTube video #2</p>
      </div>
    </div>
  </div>
)

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [time, setTime] = useState(new Date())
  const [team, setTeam] = useState([])
  const [metrics, setMetrics] = useState({ articlesToday: 0, articlesWeek: 0, socialScheduled: 0, pendingReviews: 0, activeSessions: 0 })
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    
    // Load data
    fetchTeamStatus().then(setTeam)
    fetchWorkoutFlowMetrics().then(setMetrics)
    fetchActiveTasks().then(setTasks)
    
    return () => clearInterval(timer)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '⚡' },
    { id: 'team', label: 'Team', icon: '🤖' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'actions', label: 'Actions', icon: '🎯' },
  ]

  const greeting = () => {
    const hour = time.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="app">
      <header>
        <h1>⚡ Marty</h1>
        <p className="subtitle">{greeting()} — Michael</p>
        <p className="time">{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
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
        {activeTab === 'overview' && <OverviewTab metrics={metrics} tasks={tasks} team={team} />}
        {activeTab === 'team' && <TeamTab team={team} />}
        {activeTab === 'business' && <BusinessTab metrics={metrics} />}
        {activeTab === 'tasks' && <TasksTab tasks={tasks} />}
        {activeTab === 'actions' && <ActionsTab />}
      </main>
    </div>
  )
}

export default App
