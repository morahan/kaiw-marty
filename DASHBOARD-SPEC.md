# Marty Dashboard - Specification

## Overview
Personal dashboard for Michael to see high-level information about Marty (Lead Agent), the team, and Workout Flow business metrics. Visual with text overview.

## Data Sources
- **Team Status**: sessions_list API (agent status)
- **Business Metrics**: Notion (articles, social scheduled)
- **Tasks**: Task management system (Linear/Todoist)

## Dashboard Tabs

### 1. Overview (Default)
- Articles today / this week
- Social posts scheduled
- Pending reviews
- Top 3 priority tasks at a glance

### 2. Team
- All 11 agents with online/offline status
- Role labels (Content, Trends, Reviews, etc.)

### 3. Business
- Content performance metrics
- Active focus areas (articles, X, YouTube)

### 4. Tasks
- All active tasks with priority
- Who owns each task

### 5. Actions
- What needs Michael's attention
- Urgent / Today / This Week

## Design
- Dark theme with cyan/electric blue accent (#00d4ff)
- Card-based layout
- Priority color coding (red/yellow/cyan)
- Clean, minimal text

## Build
```bash
npm install
npm run dev
```
