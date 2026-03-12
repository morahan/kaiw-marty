import { useState, useEffect } from 'react';
import { SignedIn, UserButton } from '@clerk/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

const agent = { name: 'Aria', emoji: '🎵', role: 'Personal Assistant', color: '#a855f7' };

const activityData = [
  { time: '00:00', messages: 0 },
  { time: '04:00', messages: 0 },
  { time: '08:00', messages: 12 },
  { time: '10:00', messages: 28 },
  { time: '12:00', messages: 45 },
  { time: '14:00', messages: 32 },
  { time: '16:00', messages: 55 },
  { time: '18:00', messages: 48 },
  { time: '20:00', messages: 22 },
  { time: '22:00', messages: 8 },
];

const recentActions = [
  { id: 1, action: 'Scheduled meeting with Renzo', time: '5m ago', type: 'schedule' },
  { id: 2, action: 'Sent reminder to Badger', time: '12m ago', type: 'reminder' },
  { id: 3, action: 'Created task for Thea', time: '25m ago', type: 'task' },
  { id: 4, action: 'Answered user query about Workout Flow', time: '32m ago', type: 'query' },
  { id: 5, action: 'Updated calendar for Marty', time: '1h ago', type: 'schedule' },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [stats] = useState({ today: 254, week: 1820, pending: 5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        const now = new Date();
        return [...prev.slice(-10), {
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          messages: Math.floor(Math.random() * 10),
        }];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SignedIn>
    <div className="dashboard">
      <header style={{ '--color': agent.color }}>
        <span className="emoji">{agent.emoji}</span>
        <div>
          <h1>{agent.name}</h1>
          <p>{agent.role}</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="stats-grid">
        <div className="stat">
          <span>Messages Today</span>
          <strong>{stats.today}</strong>
          <span className="trend">↑ 12%</span>
        </div>
        <div className="stat">
          <span>This Week</span>
          <strong>{stats.week}</strong>
          <span className="trend positive">↑ 18%</span>
        </div>
        <div className="stat">
          <span>Pending Tasks</span>
          <strong>{stats.pending}</strong>
        </div>
        <div className="stat">
          <span>Avg Response</span>
          <strong>1.2s</strong>
        </div>
      </div>

      <div className="chart-card full-width">
        <h3>Message Activity (Today)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={messages.length ? messages : activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none' }} />
            <Line type="monotone" dataKey="messages" stroke={agent.color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="section">
        <h2>📝 Recent Actions</h2>
        <div className="action-list">
          {recentActions.map(action => (
            <div key={action.id} className="action-item">
              <span className="action-text">{action.action}</span>
              <span className="action-time">{action.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="action-buttons">
          <button>New Task</button>
          <button>Send Reminder</button>
          <button>Schedule Meeting</button>
        </div>
      </div>
    </div>
    </SignedIn>
  );
}

export default App;
