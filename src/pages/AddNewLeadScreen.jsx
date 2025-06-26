import { useState } from "react";
import { Link } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";

const AddNewLeadScreen = () => {
    const [newLeadForm, setNewLeadForm] = useState({
        name: '',
        source: '',
        salesAgent: '',
        status: '',
        tags: '',
        timeToClose: '',
        priority: '',
        closedAt: ''
    });
    const [newLeadAlert, setNewLeadAlert] = useState(false);

    const {allAgentData} = useLeadAgentContext();
    console.log(allAgentData)

    //function to add new lead.
    const newLeadCreated = async (leadData) => {
        try{
            const response = await fetch(`https://apxgp-crm-app-backend.vercel.app/leads`, {
                method: "POST",
                body: JSON.stringify(leadData),
                headers: {
                    "content-type": "application/json"  
                }
            });
            if(!response.ok){
                throw "failed to add new lead";
            }
            const newLeadData = await response.json();
            if(newLeadData){
                console.log(newLeadData.message);
                setNewLeadAlert((prev) => !prev)
                setTimeout(() =>{
                    setNewLeadAlert((prev) => !prev)
                }, 3000);
                setNewLeadForm({
                    name: '',
                    source: '',
                    salesAgent: '',
                    status: '',
                    tags: '',
                    timeToClose: '',
                    priority: '',
                    closedAt: ''
                });
            }
        }
        catch(error){
            console.log(error);
        }
    };

    //function to update data from user to state.
    const updateNewLeadForm = (event) => {
        const {name, value} = event.target;
        setNewLeadForm((prev) => ({
            ...prev, [name]: value
        }));
    };

    //function to handle form submit.
    const handleSubmit = (event) => {
        event.preventDefault();
        if(newLeadForm.name !== '' && newLeadForm.source !== '' && 
            (newLeadForm.salesAgent !== '' && newLeadForm.salesAgent.length === 24) &&
            newLeadForm.status !== '' && newLeadForm.timeToClose >= 1 &&
            newLeadForm.priority !== ''
        ){
            newLeadCreated(newLeadForm);
        }
    };

    return(
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">Add New Lead</p>
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
                    <div className="col-md-10 border pb-5 container">
                        <form className="container mt-3 pb-5" onSubmit={handleSubmit}>
                            <label htmlFor="leadName" className="fs-5">Lead Name:</label><br/>
                            <input required type="text" id="leadName" name="name" value={newLeadForm.name} onChange={updateNewLeadForm}/><br/><br/>
                            
                            <label htmlFor="leadSource" className="fs-5">Lead Source:</label><br/>
                            <select className="fs-5" id="leadSource" required name="source" onChange={updateNewLeadForm}>
                                <option selected={newLeadForm.source === ''? true: false} value={''}>--select--</option>
                                <option value={"Website"}>Website</option>
                                <option value={"Referral"}>Referral</option>
                                <option value={"Cold Call"}>Cold Call</option>
                                <option value={"Advertisement"}>Advertisement</option> 
                                <option value={"Email"}>Email</option>
                                <option value={"Other"}>Other</option>     
                            </select><br/><br/>

                            <label className="fs-5" htmlFor="leadSalesAgent">Sales Agent:</label><br/>
                            <select className="fs-5" id="leadSalesAgent" required name="salesAgent" onChange={updateNewLeadForm}>
                                <option selected={newLeadForm.source === ''? true: false} value={''}>--select--</option>
                                {
                                    allAgentData === "Data not found."? 
                                    <option>No agents found</option> :
                                    allAgentData.length > 0 && allAgentData.map((agent) => (
                                        <option value={agent._id}>{agent.name}</option>
                                    ))
                                }    
                            </select> <br/><br/>

                            <label className="fs-5" htmlFor="leadStatus">Status:</label><br/>
                            <select className="fs-5" id="leadStatus" required name="status" onChange={updateNewLeadForm}>
                                <option selected={newLeadForm.source === ''? true: false} value={''}>--select--</option>
                                <option value={"New"}>New</option>
                                <option value={"Contacted"}>Contacted</option>
                                <option value={"Qualified"}>Qualified</option>
                                <option value={"Proposal Sent"}>Proposal Sent</option> 
                                <option value={"Closed"}>Closed</option>   
                            </select><br/><br/>
                            
                            <label className="fs-5" htmlFor="leadTags">Tags:</label><br/>
                            <input type="text" id="leadTags" name="tags" value={newLeadForm.tags} onChange={updateNewLeadForm}/><br/><br/>

                            <label className="fs-5" htmlFor="leadTimeToClose">Time To Close:</label><br/>
                            <input required type="number" id="leadTimeToClose" min={1} name="timeToClose" value={newLeadForm.timeToClose} onChange={updateNewLeadForm}/><br/><br/>

                            <label className="fs-5" htmlFor="leadPriority">Priority:</label><br/>
                            <select className="fs-5" id="leadPriority" required name="priority" onChange={updateNewLeadForm}>
                                <option selected={newLeadForm.source === ''? true: false} value={''}>--select--</option>
                                <option value={"High"}>High</option>
                                <option value={"Medium"}>Medium</option>
                                <option value={"Low"}>Low</option>  
                            </select><br/><br/>

                            <label className="fs-5" htmlFor="leadClosedAt">Closed At:</label><br/>
                            <input type="date" id="leadClosedAt" name="closedAt" value={newLeadForm.closedAt} onChange={updateNewLeadForm}/><br/><br/>

                            <button className="btn btn-success fs-5" type="submit">Submit</button>
                            {newLeadAlert && (
                                <div className="mt-2 alert alert-success" role="alert">
                                    New lead created.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewLeadScreen;