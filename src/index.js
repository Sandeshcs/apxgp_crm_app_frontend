import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.js.map";

import App from './App';
import LeadManagementScreen from './pages/LeadManagementScreen';
import LeadListScreen from './pages/LeadListScreen';
import AddNewLeadScreen from './pages/AddNewLeadScreen';
import SalesAgentManagementScreen from './pages/SalesAgentMangementScreen';
import CreateNewSalesAgent from './pages/CreateNewSalesAgent';
import ReportsScreen from './pages/ReportsScreen';
import LeadListView from './pages/LeadStatusView';
import SalesAgentView from './pages/SalesAgentVIew';
import { LeadAgentProvider } from './context/LeadAgentContext';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LeadAgentProvider>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='leadManagement/:leadId' element={<LeadManagementScreen/>}/>
          <Route path='leadList' element={<LeadListScreen/>}/>
          <Route path='addNewLead' element={<AddNewLeadScreen/>}/>
          <Route path='salesAgentManagement' element={<SalesAgentManagementScreen/>}/>
          <Route path='addNewSalesAgent' element={<CreateNewSalesAgent/>}/>
          <Route path='reports' element={<ReportsScreen/>}/>
          <Route path='leadListView' element={<LeadListView/>}/>
          <Route path='salesAgentView' element={<SalesAgentView/>}/>
        </Routes>
      </LeadAgentProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
