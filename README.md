## Overview

This assignment is built with [Create React App](https://github.com/facebook/create-react-app) and [json-server](https://github.com/typicode/json-server). The starter kit already ships with:

- React 18
- Material UI (MUI v5)
- Redux Toolkit
- React Router DOM v7
- [Plotly](https://plot.ly/javascript/react/)

Use only the dependencies already included in `package.json`.

## Setup

### Prerequisites

- Node.js v22.x (or later)
- npm 10.x (or later)

### Install Dependencies

```powershell
PS> git clone https://github.com/EarthScienceAnalytics/react-assignment.git
PS> cd react-assignment
PS> npm install
```

### Run the API Server

1. **Stable mode (default)**  
   Provides reliable responses for quick UI checks.

   ```powershell
   PS> npm run start-server
   ```

2. **Flaky mode (assessment challenge)**  
   Enables a 10 % chance of `500` errors and a 20 % chance of 3 s delays. Use this when validating loading states, retries, and error messaging.

   ```powershell
   PS> npm run start-server-flaky
   ```

### Run the React App

```powershell
PS> npm start
```

## Assessment Steps

### Step 1 – EsaList Component

- Build an `EsaList` component that allows selecting and deselecting list items.
- Consider keyboard and mouse interactions while keeping the UI responsive.

<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/EsaList.png" width="300" />

### Step 2 – Wellbore & Histogram Pages

#### Wellbore Page

<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Wellbore1.png" />
<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Wellbore2.png" />
<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Wellbore3.png" />

- Require at least one well, log, and formation selection to enable the `SHOW PLOT` button.
- Fetch and render scatter plots for every selected well.
- Persist selections when navigating to and from the Histogram page.
- Disable log and formation options that are incompatible with the selected wells.

#### Histogram Page

<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Histogram1.png" />
<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Histogram2.png" />
<img src="https://github.com/georgesimos/react-assignment/blob/master/readme-assets/Histogram3.png" />

- Mirror the selection rules from the Wellbore page (shared state).
- Render histogram plots for the selected wells.
- Let users switch bar mode (`stack` or `group`) and orientation (`vertical` or `horizontal`) and update the layout accordingly.

### Step 3 – Resilience Requirements

- Display clear loading indicators whenever data is pending.
- Present meaningful errors if operations still fail after retries.
- Add retry functionality to the lists in order refetch to failed network requests to handle transient server issues.
- Ensure the UI recovers gracefully from timeouts and `500` responses triggered by the flaky server mode.
- Extra implementation changes or additional automated tests are optional; they are not required but will be well received if included.

### Technical Requirements

- Deliver a Single Page Application (SPA).
- Manage state with Redux Toolkit slices.
- Implement charts with Plotly.

## API Reference (`db.json`)

<details>

<summary>Endpoints</summary>

<br />

- GET `http://localhost:8000/wells`  
  Returns all wells with associated `logIds` and `formationIds`.
- GET `http://localhost:8000/logs`  
  Returns all logs with their `wellIds`.
- GET `http://localhost:8000/formations`  
  Returns all formations with their `wellIds`.
- GET `http://localhost:8000/plots`  
  Returns all plots.
- GET `http://localhost:8000/plots?wellId=1&wellId=2`  
  Returns plots filtered by well IDs.

</details>

## Submission

**Very Important!** In order for us to evaluate your submission please make sure all your changes are committed and these commits have been pushed to your git repository.

```powershell
PS> git push
```

## Implementation Notes

- Lists and charts display loading indicators and surface errors with inline retry actions to cope with flaky API responses.
- Log and formation entries automatically disable when they are incompatible with the current well selection, keeping selections valid across navigation.
- Scatter and histogram plots reuse persisted selections, so switching between pages preserves context.
