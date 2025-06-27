import { Link } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";
import { useEffect, useState } from "react";

const LeadListScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState({
        filterOneName: '',
        filterOneValue: '',
        filterTwoName: '',
        filterTwoValue: '',
        sortByName: '',
        order: ''
    });
    const [leadDataToDisplay, setLeadDataToDisplay] = useState([]);

    //used context to get fetch data.
    const {leadLoading, allLeadData, leadError, allAgentData} = useLeadAgentContext();
    useEffect(() => {
        setLeadDataToDisplay(allLeadData);
    }, [allLeadData]);
    console.log(allLeadData, allAgentData)

    const updateSelectedFilter = (event, filterOrSortType) => {
        const {name, value} = event.target;
        if(filterOrSortType === "filter"){
            if(name === "status"){
                setSelectedFilter((prev) => ({
                    ...prev, filterOneName: name, filterOneValue: value
                }));
            }
            else if(name === "salesAgent"){
                setSelectedFilter((prev) => ({
                    ...prev, filterTwoName: name, filterTwoValue: value
                }));
            }
        }else{
            setSelectedFilter((prev) => ({
                ...prev, sortByName: name, order: value
            }));
        }
    };

   useEffect(() => {
        fetchFilteredData(selectedFilter);    
    }, [selectedFilter]);

    const fetchFilteredData = (filterData) => {
        //console.log(filterData);
        fetch(`https://apxgp-crm-app-backend.vercel.app/leads?${filterData.filterOneName}=${filterData.filterOneValue}&${filterData.filterTwoName}=${filterData.filterTwoValue}&sortby=${filterData.sortByName}&order=${filterData.order}`)
        .then((response) => response.json())
        .then((data) => {
            data && data.data && data.data.length>0? setLeadDataToDisplay(data.data) : setLeadDataToDisplay(data.message);
        })
        .catch((error) => console.log(error));
    };

    console.log(leadDataToDisplay)

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">Lead List</p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-md-2 border container">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="fs-5 link-underline link-underline-opacity-0" to={'/'}>Back to Dashboard</Link>
                    </div>
                    <div className="col-md-10 border container pb-5">
                        <p className="fw-medium fs-3">Lead Overview</p>
                        <hr/>
                        
                        <div className="row">
                            <div className="form-floating mb-3" style={{"maxWidth": "250px"}}>
                                <select className="form-select" aria-label="Filter by status" id="leadStatus" name="status" onChange={(event) => updateSelectedFilter(event, "filter")}>
                                    <option selected value={""}>-- select status --</option>
                                    <option value={'New'}>New</option>
                                    <option value={"Contacted"}>Contacted</option>
                                    <option value={"Qualified"}>Qualified</option>
                                    <option value={"Proposal Sent"}>Proposal Sent</option> 
                                    <option value={"Closed"}>Closed</option>   
                                </select>
                                <label className="ms-2 fw-medium" htmlFor="leadStatus">Filter By Status:</label>
                            </div>

                            <div className="form-floating" style={{"maxWidth": "250px"}}>
                                <select className="form-select" aria-label="Filter By Sales Agent" id="leadStatus" name="salesAgent" onChange={(event) => updateSelectedFilter(event, "filter")}>
                                <option selected value={''}>--select agent--</option>
                                {
                                    allAgentData === "Data not found."? 
                                    <option>No agents found</option> :
                                    allAgentData && allAgentData.length > 0 && allAgentData.map((agent, index) => (
                                        <option key={index} value={agent._id}>{agent.name}</option>
                                    ))
                                }  
                                </select>
                                <label htmlFor="leadStatus" className="ms-2 fw-medium">Filter By Sales Agent:</label>
                            </div>

                            <div className="form-floating" style={{"maxWidth": "250px"}}>
                                <select className="form-select" id="leadStatus" aria-label="Sort By Priority" name="priority" onChange={(event) => updateSelectedFilter(event, "sort")}>
                                    <option selected value={''}>-- select sorting --</option>
                                    <option value={"asc"}>High To Low</option>
                                    <option value={"des"}>Low To High</option> 
                                </select>     
                                <label className="ms-2 fw-medium" htmlFor="leadStatus">Sort By Priority:</label>
                            </div>
                            
                            <div className="form-floating" style={{"maxWidth": "250px"}}>
                                <select className="form-select" aria-label="Sort By Time To Close" id="timeToClose" name="timeToClose" onChange={(event) => updateSelectedFilter(event, "sort")}>
                                    <option selected value={''}>-- select time to close --</option>
                                    <option value={"des"}>Longest To Close</option>
                                    <option value={"asc"}>Soonest To Close</option> 
                                </select>
                                <label htmlFor="timeToClose" className="ms-2 fw-medium">Sort By Time To Close:</label>
                            </div>
                        </div>

                        {leadLoading && <p>Loading...</p>}
                        {leadError && <p>{leadError}</p>}
                        {
                            leadDataToDisplay === "Data not found."? 
                            <p className="fs-5 fw-medium">No leads found.</p> : (
                            <div className="row container col-md-12">
                                <div className="card rounded-0">
                                    <div className="card-body row">
                                        <span className="fs-5 col-md-3 fw-medium">NAME</span>
                                        <span className="fs-5 col-md-2 fw-medium">STATUS</span>
                                        <span className="fs-5 col-md-3 fw-medium">SALES AGENT</span>
                                        <span className="fs-5 col-md-2 fw-medium">PRIORITY</span>
                                        <span className="fs-5 col-md-2 fw-medium">TIME TO CLOSE</span>
                                    </div>
                                </div>
                                {
                                    leadDataToDisplay && leadDataToDisplay.length > 0 && leadDataToDisplay.map((lead, index) => (
                                    <div className="card rounded-0" key={index}>
                                        <div className="card-body row">
                                            <span className="fs-5 col-md-3">{lead.name}</span>
                                            <span className="fs-5 col-md-2">{lead.status}</span>
                                            <span className="fs-5 col-md-3">{lead.salesAgent.name}</span>
                                            <span className="fs-5 col-md-2">{lead.priority}</span>
                                            <span className="fs-5 col-md-2">{lead.timeToClose} Days</span>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                            )
                        }
                        <hr/>
                        
                        <Link className="btn btn-primary" to={'/addNewLead'}>Add New Lead</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeadListScreen;