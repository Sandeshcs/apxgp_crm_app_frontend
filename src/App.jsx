import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useLeadAgentContext from "./context/LeadAgentContext";
import { useEffect, useState } from "react";

function App() {
  const [selectedFilter, setSelectedFilter] = useState({});
  const [leadDataToDisplay, setLeadDataToDisplay] = useState([]);

  //used context to get fetch data.
  const {leadLoading, allLeadData, leadError} = useLeadAgentContext();
  useEffect(() => {
    setLeadDataToDisplay(allLeadData);
  }, [allLeadData]);
  //console.log(leadDataToDisplay)

  const noOfNewLeads = leadDataToDisplay === "Data not found."? 0 :leadDataToDisplay.reduce((acc, curr) => curr.status === "New"? ++acc:acc, 0);
  const noOfContactedLeads = leadDataToDisplay === "Data not found."? 0 :leadDataToDisplay.reduce((acc, curr) => curr.status === "Contacted"? ++acc:acc, 0);
  const noOfQualifiedLeads = leadDataToDisplay === "Data not found."? 0 :leadDataToDisplay.reduce((acc, curr) => curr.status === "Qualified"? ++acc:acc, 0);
  const noOfProposalSentLeads = leadDataToDisplay === "Data not found."? 0 :leadDataToDisplay.reduce((acc, curr) => curr.status === "Proposal Sent"? ++acc:acc, 0);
  const noOfClosedLeads = leadDataToDisplay === "Data not found."? 0 :leadDataToDisplay.reduce((acc, curr) => curr.status === "Closed"? ++acc:acc, 0);
  
  const updateSelectedFilter = (event) => {
    const {name, value} = event.target;
    setSelectedFilter((prev) => ({
      ...prev, filtername: name, data: value
    }));
  };

  useEffect(() => {
    fetchFilteredData(selectedFilter);    
  }, [selectedFilter]);

  const fetchFilteredData = (filterData) => {
      fetch(`https://apxgp-crm-app-backend.vercel.app/leads?${filterData.filtername}=${filterData.data}`)
      .then((response) => response.json())
      .then((data) => {
        data && data.data && data.data.length>0? setLeadDataToDisplay(data.data) : setLeadDataToDisplay(data.message);
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid position-relative py-4">
            <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">APXGP CRM Dashboard</p>
          </div>
        </nav>
      </header>
      <div className="container">
        <div className="row mt-3 mb-5">
          <div className="col-md-2 border container">
            <p className="fw-medium fs-3">Sidebar</p>
            <div className="list-group">
              <Link className="list-group-item list-group-item-action fs-5" to={'/leadList'}>Leads</Link>
              <Link className="list-group-item list-group-item-action fs-5" to={'/salesAgentManagement'}>Sales</Link>
              <Link className="list-group-item list-group-item-action fs-5" to={'/reports'}>Reports</Link>
              <Link className="list-group-item list-group-item-action fs-5" to={'/leadListView'}>Lead Status View</Link>
              <Link className="list-group-item list-group-item-action fs-5" to={'/salesAgentView'}>Sales Agent View</Link>
            </div>
          </div>
          <div className="col-md-10 border container pb-5">
            <p className="fw-medium fs-3">Main Content</p>
            <hr/>
            <p className="fw-normal fs-4 text-decoration-underline">Lead Names</p>

            <div className="form-floating mb-3" style={{"maxWidth": "250px"}}>
              <select className="form-select" id="leadStatus" aria-label="Filter By Status" name="status" onChange={updateSelectedFilter}>
                <option selected value={''}>--select status--</option>
                <option value={"New"}>New</option>
                <option value={"Contacted"}>Contacted</option>
                <option value={"Qualified"}>Qualified</option>
                <option value={"Proposal Sent"}>Proposal Sent</option> 
                <option value={"Closed"}>Closed</option>   
              </select>
              <label htmlFor="leadStatus" className="fw-medium">Filter By Status:</label>
            </div>

            {leadLoading && <p>Loading...</p>}
            {leadError && <p>{leadError}</p>}
            {
              leadDataToDisplay === "Data not found."? 
              <p className="fs-5 fw-medium">No leads found.</p> : 
              leadDataToDisplay && leadDataToDisplay.length > 0 && leadDataToDisplay.map((lead, index) => (
              <Link className="btn btn-outline-info me-3" to={`/leadManagement/${lead._id}`}>
                <small key={index} className="fs-5">{lead.name}</small>
              </Link>
              ))
            }
            <hr/>

            <p className="fw-normal fs-4 text-decoration-underline">Lead Status Details</p>
            <div className="card col-md-12 container">
              <div className="card-header row">
                <span className="col-md-2 fw-medium">NEW</span>
                <span className="col-md-3 fw-medium">CONTACTED</span>
                <span className="col-md-2 fw-medium">QUALIFIED</span>
                <span className="col-md-3 fw-medium">PROPOSAL SENT</span>
                <span className="col-md-2 fw-medium">CLOSED</span>
              </div>
              <div className="card-body row">
                  <span className="fs-5 col-md-2">{noOfNewLeads} Leads</span>
                  <span className="fs-5 col-md-3">{noOfContactedLeads} Leads</span>
                  <span className="fs-5 col-md-2">{noOfQualifiedLeads} Leads</span>
                  <span className="fs-5 col-md-3">{noOfProposalSentLeads} Leads</span>
                  <span className="fs-5 col-md-2">{noOfClosedLeads} Leads</span>
              </div>
            </div>
            <hr/>

            <Link to={'/addNewLead'} className="btn btn-primary">Add New Lead</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
