import { Link } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";
import { useEffect, useState } from "react";

const SalesAgentView = () => {
    const [selectedFilter, setSelectedFilter] = useState({
        filterOneName: 'salesAgent',
        filterOneValue: '685bb9c97c3e721f57afd1c6',
        filterTwoName: '',
        filterTwoValue: '',
        filterThreeName: '',
        filterThreeValue: '',
        sortByName: '',
        order: ''
    });
    const [leadDataToDisplay, setLeadDataToDisplay] = useState([]);

    //used context to get fetch data.
    const {leadLoading, allLeadData: allLeadsFetched, leadError, allAgentData} = useLeadAgentContext();
    useEffect(() => {
        setLeadDataToDisplay(allLeadsFetched);
    }, [allLeadsFetched]);
    //console.log(allLeadsFetched)

    const updateSelectedFilter = (event, actionType) => {
        const {name, value} = event.target;
        if(actionType === "filter"){
            if(name === "salesAgent"){
                setSelectedFilter((prev) => ({
                    ...prev, filterOneName: name, filterOneValue: value
                }));
            }
            else if(name === "status"){
                setSelectedFilter((prev) => ({
                    ...prev, filterTwoName: name, filterTwoValue: value
                }));
            }else if(name === "priority"){
                setSelectedFilter((prev) => ({
                    ...prev, filterThreeName: name, filterThreeValue: value
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
        console.log(filterData);
        fetch(`https://apxgp-crm-app-backend.vercel.app/leads?${filterData.filterOneName}=${filterData.filterOneValue}&${filterData.filterTwoName}=${filterData.filterTwoValue}&${filterData.filterThreeName}=${filterData.filterThreeValue}&sortby=${filterData.sortByName}&order=${filterData.order}`)
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
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">Lead By Sales Agent</p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-md-2 border container">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="link-underline link-underline-opacity-0 fs-5" to={'/'}>Back to Dashboard</Link>
                    </div>
                    <div className="col-md-10 border container pb-5">
                        <p className="fw-medium fs-3">Lead List By Agent</p>
                        <hr/>
                        
                        <div className="row">
                            <div className="form-floating mb-3" style={{"maxWidth": "250px"}}>
                                <select className="form-select" aria-label="Filter by status" id="leadStatus" name="status" onChange={(event) => updateSelectedFilter(event, "filter")}>
                                    <option value={""}>-- select status --</option>
                                    <option value={'New'}>New</option>
                                    <option value={"Contacted"}>Contacted</option>
                                    <option value={"Qualified"}>Qualified</option>
                                    <option value={"Proposal Sent"}>Proposal Sent</option> 
                                    <option value={"Closed"}>Closed</option>   
                                </select>
                                <label className="ms-2 fw-medium" htmlFor="leadStatus">Filter By Status:</label>
                            </div>

                            <div className="form-floating" style={{"maxWidth": "250px"}}>
                                <select className="form-select" id="leadStatus" aria-label="Filter By Priority" name="priority" onChange={(event) => updateSelectedFilter(event, "filter")}>
                                    <option selected value={''}>--select priority--</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Low"}>Low</option>   
                                </select>     
                                <label className="ms-2 fw-medium" htmlFor="leadStatus">Filter By Priority:</label>
                            </div>
                            
                            <div className="form-floating" style={{"maxWidth": "250px"}}>
                                <select className="form-select" aria-label="Sort By Time To Close" id="timeToClose" name="timeToClose" onChange={(event) => updateSelectedFilter(event, "sort")}>
                                    <option selected value={''}>--select time to close--</option>
                                    <option value={"des"}>Longest To Close</option>
                                    <option value={"asc"}>Soonest To Close</option> 
                                </select>
                                <label htmlFor="timeToClose" className="ms-2 fw-medium">Sort By Time To Close:</label>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-floating" style={{"maxWidth": "250px"}}>
                            <select className="form-select" aria-label="Filter By Sales Agent" id="leadStatus" name="salesAgent" onChange={(event) => updateSelectedFilter(event, "filter")}>
                                <option value={""}>All</option>
                                {
                                    allAgentData === "Data not found."? 
                                    <option>No agents found</option> :
                                    allAgentData && allAgentData.length > 0 && allAgentData.map((agent, index) => (
                                        <option selected={selectedFilter.filterOneValue === agent._id? true: false} key={index} value={agent._id}>{agent.name}</option>
                                    ))
                                } 
                            </select>
                            <label htmlFor="leadStatus" className="fw-medium">Filter By Sales Agent:</label>
                        </div>

                        <hr/>
                        {leadLoading && <p>Loading...</p>}
                        {leadError && <p>{leadError}</p>}
                        {
                            leadDataToDisplay === "Data not found."? 
                            <p className="fs-5 fw-medium">No leads found.</p> : (
                            <div className="row container col-md-12">
                                <div className="card rounded-0">
                                    <div className="card-header row">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SalesAgentView;