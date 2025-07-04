# APXGP CRM APP

A lead and sales agent management app where you can display, add, update leads and sales agent and perform filter and sortby and can add comments.

Built with React.js frontend, Express.js/Node.js backend, MongoDB database.

---
## App Demo Link

[App Live Demo](https://apxgp-crm-app-frontend.vercel.app/)

---

## Qucik Start

```
git clone https://github.com/Sandeshcs/apxgp_crm_app_frontend.git
cd apxgp_crm_app_frontend
npm install
npm start
```

---

## Technologies
- React.js
- React Router
- Node.js
- Express.js
- MongoDB
- Bootstarp

---

## App Demo Video
Watch a walkthrough ( 7 minutes ) of all the major features of this app:
[App Demo Video](https://drive.google.com/file/d/11ta2d6NaX4qyR0Zc6aOV9u4ruexTqY6u/view?usp=sharing)

---

## Features
**Dashboard**
- Display of all leads (only lead names, if u click any lead name it will display full details of that lead).
- Filter leads by status.
- Lead status distribution.
- Button to add new lead.

**Leads**
- Display of all leads(name, status, source, priority, sales agent, time to close).
- Filter leads by status, sales agent.
- Sortby priority, time to close.
- Button to add new lead.

**Individual Lead Management And Comment Section**
- In dashboard if u click anyone lead name you will see this page which displays details of each lead(name, sales agent, source, status, priority, time to close).
- Edit/update lead details button (name, sales agent, source, status, priority, time to close).
- Add new comment button (add name, email).
- Display of all comments of this lead only (display author name, comment, data and time).

**Add New Lead**
- Form with fields - name, source, sales agent, status, priority, time to close.
- Submit button.

**Sales Agent Management**
- Display of all sales agent (name, email).
- Add new sales agent button.

**Add New Sales Agent**
- Form with fields - name, email.
- Submit button.

**Reports Screen**
- Leads closed and leads in the pipeline (doughnut chart).
- Leads closed by sales agent (bar chart).
- Lead status distribution (doughnut chart).

**Leads View By Status**
- Display of leads by default display leads of status **new**.
- Filter by status, sales agent, priority.
- Sort by time to close.

**Leads View By Sales Agent**
- Display of leads by default display leads of sales agent is **suraj**.
- Filter by sales agent, status, priority.
- Sort by time to close.

---

## API Reference
### Lead Api's
#### GET /api/leads
Display all leads.

Sample Resopnse:
```
[{_id, name, status, source, salesAgent, tags, timeToClose, priority, createdAt, updatedAt, closedAt}, ...]
```

#### GET /api/leads?filterOneName=filterOneValue&filterTwoName=filterTwoValue&filterThreeName=filterThreeValue&sortby=sortByName&order=des/asc
- Display all leads based on filter and sortby and order.
- If no filter, sortby, order selected then all leads are displayed.

Sample Resopnse:
```
[{_id, name, status, source, salesAgent, tags, timeToClose, priority, createdAt, updatedAt closedAt}, ...]
```

#### POST /api/leads
Post lead data when we click submit button in add new lead form.

Sample Resopnse:
```
{_id, name, status, source, salesAgent, tags, timeToClose, priority, createdAt, updatedAt, closedAt}
```

#### POST(update) /api/leads/:leadId
Update lead data when we click submit in edit/update lead button in individual lead management and comment section.

Sample Resopnse:
```
{_id, name, status, source, salesAgent, tags, timeToClose, priority, createdAt, updatedAt, closedAt}
```

### Sales agent Api's
#### GET /api/sales-agent
Display all sales agent.

Sample Resopnse:
```
[{_id, name, email}, ...]
```

#### POST /api/sales-agent
Post new sales agent when we click submit in add new sales agent form.

Sample Resopnse:
```
{_id, name, email}
```

### Comments Api's
#### GET /api/comments/
Fetch all comments then we filter and display comments of specific lead.

Sample Response:

```
[{_id, lead(means leadId used to filter), author, commentText}, ...]
```
* Lead in sample means leadId used to filter and display comments of specific lead.
* Author means sales agent who commented.

---

#### POST /api/comments
Post new comment when submit button clicked.

Sample Response:

```
{_id, lead, author, commentText}
```

## Contact
For bugs or feature request please reach out to sandeshcs2921@gmail.com.