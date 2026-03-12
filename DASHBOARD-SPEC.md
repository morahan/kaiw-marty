# Aria Dashboard - Specification

## Overview
Personal dashboard for Michael to see high-level important information from Aria (personal life assistant). Visual, not text-heavy. Beautiful, themed, unique.

## Data Sources
- **Health**: Oura ring API (sleep, readiness, HRV, activity)
- **Family**: Memory files (birthdays, events, notes)
- **Business**: From Marty (task summaries, metrics)
- **Team**: Agent status from sessions_list
- **Personal**: Reminders, upcoming appointments

## Dashboard Tabs/Sections

### 1. Health (Oura)
- Sleep score (circular gauge)
- Readiness score
- HRV trend (mini sparkline)
- Activity: steps, calories
- Last sync time

### 2. Family
- Family member cards (Melissa, Elora, Iris, Lola)
- Upcoming birthdays/events
- Quick notes

### 3. Business
- Tasks requiring attention
- Key metrics from Marty
- What's pending review

### 4. Team
- Agent online/offline status
- Active sessions count

### 5. Action Items
- What needs Michael's attention today
- Priority-sorted tasks

## Design
- Dark theme with accent colors
- Aria branding (melody/air theme)
- Card-based layout
- Gauges for scores
- Color coding: green (good), yellow (warning), red (attention)

## Build Plan
1. Set up React structure with tabs
2. Create API service for data fetching
3. Build individual tab components
4. Style with CSS
5. Add animations/transitions

