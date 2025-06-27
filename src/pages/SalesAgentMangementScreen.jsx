import { Link } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";

const SalesAgentManagementScreen = () => {
    const {agentLoading, allAgentData, agnetError} = useLeadAgentContext();
    //console.log(allAgentData);
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">Sales Agent Management</p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 pb-5">
                    <div className="col-md-2 border container">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="link-underline link-underline-opacity-0 fs-5" to={'/'}>Back to Dashboard</Link>
                    </div>
                    <div className="col-md-10 border container pb-5">
                        <p className="fw-medium fs-3">Sales Agent List</p>
                        <hr/>
                        <div>
                            <p className="fs-4 text-decoration-underline">Display agents here</p>
                            {agentLoading && <p>Loading...</p>}
                            {agnetError && <p>{agnetError}</p>}
                            {
                                allAgentData === "Data not found." || allAgentData.length === undefined? 
                                <p className="fs-5 fw-medium">No sales agent found.</p> : (
                                    <div className="row">
                                        {
                                            allAgentData && allAgentData.length > 0 && allAgentData.map((salesAgent, index) => (
                                                <div className="card col-md-3 ms-3 mb-3" key={index}>
                                                    <div className="card-body">
                                                        <p><span className="fw-medium">Name: </span>{salesAgent.name}</p>
                                                        <p><span className="fw-medium">Email: </span>{salesAgent.email}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <Link className="btn btn-primary mt-3" to={'/addNewSalesAgent'}>Add New Sales Agent</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SalesAgentManagementScreen;