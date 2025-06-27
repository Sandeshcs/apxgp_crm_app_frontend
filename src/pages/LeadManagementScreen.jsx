import { Link, useParams } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";
import { useState } from "react";

const LeadManagementScreen = () => {
    const {leadLoading, allLeadData, leadError, allAgentData, setRefetchLeadData, setRefetchCommentData, commentLoading, allCommentData, commentError} = useLeadAgentContext();
    //console.log(allCommentData)
    const [showOrCloseNewCommentWindow, setShowOrCloseNewCommentWindow] = useState(false);
    const [showOrCloseLeadOrEditWindow, setShowOrCloseLeadOrEditWindow] = useState(true);
    
    const [leadUpdatealertMessage, setLeadUpdateAlertMessage] = useState(false);
    const [newCommentalertMessage, setNewCommentAlertMessage] = useState(false);

     //getting specific lead data using allLeadData from context.
    const {leadId} = useParams();
    const oneLeadData = allLeadData.reduce((acc, curr) => {
        if(curr._id === leadId){
            acc = curr;
        }
        return acc;
    }, {});
    //console.log(oneLeadData);

    const [newLeadForm, setNewLeadForm] = useState(null);
    const [newCommentForm, setNewCommentForm] = useState({
        lead: leadId,
        author: '',
        commentText: '',
    });

    const openOrCloseLeadOrEditWindow = (actionType) => {
        if(actionType === "open"){
            setShowOrCloseLeadOrEditWindow((showOrCloseLeadOrEditWindow) => !showOrCloseLeadOrEditWindow);
            setNewLeadForm({...oneLeadData, salesAgent: oneLeadData.salesAgent._id});
        }else{
            setShowOrCloseLeadOrEditWindow((showOrCloseLeadOrEditWindow) => !showOrCloseLeadOrEditWindow);
            setNewLeadForm(null);
        }
    }

    const openOrCloseNewCommentWindow = (actionType) => {
        if(actionType === "open"){
            setShowOrCloseNewCommentWindow((showOrCloseNewCommentWindow) => !showOrCloseNewCommentWindow);
        }else{
            setShowOrCloseNewCommentWindow((showOrCloseNewCommentWindow) => !showOrCloseNewCommentWindow);
        }
    }

    //function to update lead.
    const leadUpdated = async (leadData) => {
        //console.log(leadData);
        try{
            const response = await fetch(`https://apxgp-crm-app-backend.vercel.app/leads/${leadId}`, {
                method: "POST",
                body: JSON.stringify(leadData),
                headers: {
                    "content-type": "application/json"  
                }
            });
            console.log(response);
            if(!response.ok){
                throw "failed to update lead";
            }
            const updatedLeadData = await response.json();
            if(updatedLeadData){
                console.log(updatedLeadData.message);
                setRefetchLeadData((prev) => !prev);
                setLeadUpdateAlertMessage((prev) => !prev)
                setTimeout(() =>{
                    setLeadUpdateAlertMessage((prev) => !prev)
                }, 3000);
                openOrCloseLeadOrEditWindow("close");
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
            leadUpdated(newLeadForm);
        }
    };

    //function to add new comment.
    const createNewComment = async (commentData) => {
        try{
            const response = await fetch(`https://apxgp-crm-app-backend.vercel.app/comments`, {
                method: "POST",
                body: JSON.stringify(commentData),
                headers: {
                    "content-type": "application/json"  
                }
            });
            console.log(response);
            if(!response.ok){
                throw "failed to add new comment";
            }
            const newCommentData = await response.json();
            if(newCommentData){
                console.log(newCommentData.message);
                setNewCommentAlertMessage((prev) => !prev)
                setTimeout(() =>{
                    setNewCommentAlertMessage((prev) => !prev)
                }, 3000);
                setRefetchCommentData((prev) => !prev);
                setNewCommentForm({
                    author: '',
                    commentText: ''
                });
                openOrCloseNewCommentWindow("close");
            }
        }
        catch(error){
            console.log(error);
        }
    };

    const updateNewCommentForm = (event) => {
        const {name, value} = event.target;
        setNewCommentForm((prev) => ({
            ...prev, [name]: value
        }));
        //console.log(newCommentForm);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if(newCommentForm.lead.length === 24 && newCommentForm.author.length === 24 && newCommentForm.commentText !== ''){
            createNewComment(newCommentForm);
        }
    };

    const commentsOfThisLead = allCommentData === "Data not found."? []: allCommentData.filter((comment) => comment.lead._id === leadId);
    
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-4">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">
                            Lead Management: {oneLeadData.name? oneLeadData.name.toUpperCase() : ''}
                        </p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 pb-5">
                    <div className="col-md-2 border p-2">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="link-underline link-underline-opacity-0 fs-5" to={'/'}>Back to Dashboard</Link>
                    </div>
                    <div className="col-md-10 border p-2 pb-5">
                        <p className="fw-medium fs-3">Lead Details</p>
                        <hr/>
                        {leadLoading && <p>Loading...</p>}
                        {leadError && <p>{leadError}</p>}
                        {leadUpdatealertMessage && (
                            <div className="w-50 mt-3 alert alert-success" role="alert">
                                Lead updated.
                            </div>
                        )}
                        {
                            showOrCloseLeadOrEditWindow === true? (
                                <div>
                                    <p className="fs-5">Name : {oneLeadData.name? oneLeadData.name.charAt(0).toUpperCase()+oneLeadData.name.slice(1, oneLeadData.name.length) : ''}</p>
                                    <p className="fs-5">Source : {oneLeadData.source}</p>
                                    <p className="fs-5">Sales Agent : {oneLeadData.salesAgent? oneLeadData.salesAgent.name.charAt(0).toUpperCase()+oneLeadData.salesAgent.name.slice(1, oneLeadData.salesAgent.name.length):''}</p>
                                    <p className="fs-5">Status : {oneLeadData.status}</p>
                                    <p className="fs-5">Time To Close : {oneLeadData.timeToClose} Days</p>
                                    <p className="fs-5">Priority : {oneLeadData.priority}</p>
                                    <button onClick={() => openOrCloseLeadOrEditWindow('open')} className="btn btn-primary">Edit Lead</button>
                                </div>
                                ) : (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="leadName">Lead Name:</label><br/>
                                    <input required type="text" id="leadName" name="name" value={newLeadForm?.name || ''} onChange={updateNewLeadForm}/><br/><br/>
                                    
                                    <label htmlFor="leadSource">Lead Source:</label><br/>
                                    <select id="leadSource" required name="source" onChange={updateNewLeadForm}>                                        <option selected={newLeadForm.source === "Website"? true: false} value={"Website"}>Website</option>
                                        <option selected={newLeadForm.source === "Referral"? true: false} value={"Referral"}>Referral</option>
                                        <option selected={newLeadForm.source === "Cold Call"? true: false} value={"Cold Call"}>Cold Call</option>
                                        <option selected={newLeadForm.source === "Advertisement"? true: false} value={"Advertisement"}>Advertisement</option> 
                                        <option selected={newLeadForm.source === "Email"? true: false} value={"Email"}>Email</option>
                                        <option selected={newLeadForm.source === "Other"? true: false} value={"Other"}>Other</option>     
                                    </select><br/><br/>

                                    <label htmlFor="leadSalesAgent">Sales Agent:</label><br/>
                                    <select id="leadSalesAgent" required name="salesAgent" onChange={updateNewLeadForm}>
                                        {
                                            allAgentData === "Data not found."? <p>No sales agent found.</p> :
                                            allAgentData.length > 0 && allAgentData.map((agent, index) => (
                                                <option selected={newLeadForm.salesAgent === agent._id? true: false} value={agent._id} key={index}>{agent.name}</option>
                                            ))
                                        }    
                                    </select> <br/><br/>

                                    <label htmlFor="leadStatus">Status:</label><br/>
                                    <select id="leadStatus" required name="status" onChange={updateNewLeadForm}>
                                        <option selected={newLeadForm.status === "New"? true: false} value={"New"}>New</option>
                                        <option selected={newLeadForm.status === "Contacted"? true: false} value={"Contacted"}>Contacted</option>
                                        <option selected={newLeadForm.status === "Qualified"? true: false} value={"Qualified"}>Qualified</option>
                                        <option selected={newLeadForm.status === "Proposal Sent"? true: false} value={"Proposal Sent"}>Proposal Sent</option> 
                                        <option selected={newLeadForm.status === "Closed"? true: false} value={"Closed"}>Closed</option>   
                                    </select><br/><br/>
                                    
                                    <label htmlFor="leadTags">Tags:</label><br/>
                                    <input type="text" id="leadTags" name="tags" value={newLeadForm?.tags || ''} onChange={updateNewLeadForm}/><br/><br/>

                                    <label htmlFor="leadTimeToClose">Time To Close:</label><br/>
                                    <input required type="number" id="leadTimeToClose" min={1} name="timeToClose" value={newLeadForm?.timeToClose || ''} onChange={updateNewLeadForm}/><br/><br/>

                                    <label htmlFor="leadPriority">Priority:</label><br/>
                                    <select id="leadPriority" required name="priority" onChange={updateNewLeadForm}>
                                        <option selected={newLeadForm.priority === "High"? true: false} value={"High"}>High</option>
                                        <option selected={newLeadForm.priority === "Medium"? true: false} value={"Medium"}>Medium</option>
                                        <option selected={newLeadForm.priority === "Low"? true: false} value={"Low"}>Low</option>  
                                    </select><br/><br/>

                                    <label htmlFor="leadClosedAt">Closed At:</label><br/>
                                    <input type="date" id="leadClosedAt" name="closedAt" value={newLeadForm?.closedAt || ''} onChange={updateNewLeadForm}/><br/><br/>

                                    <button className="btn btn-success" type="submit">Submit</button>
                                    <button className="btn btn-danger ms-3" onClick={() => openOrCloseLeadOrEditWindow("close")}>Close</button>
                                </form>
                                )
                        }
                        <hr/>
                        <p className="fw-medium fs-3">Comments Section</p>
                        <hr/>
                        {newCommentalertMessage && (
                            <div className="w-50 mt-2 alert alert-success" role="alert">
                                New Comment Added.
                            </div>
                        )}
                        {
                            showOrCloseNewCommentWindow === false? 
                                <button className="btn btn-primary mb-3" onClick={() => openOrCloseNewCommentWindow("open")}>Add New Comment</button> : (
                                    <form onSubmit={handleCommentSubmit}>
                                        <label className="me-2 fs-5" htmlFor="authorOfComment">Author(Sales Agent):</label>
                                        <select id="authorOfComment" required name="author" onChange={updateNewCommentForm}>
                                            <option selected={newCommentForm.author === ''? true: false} value={''}>--select author--</option>
                                            {
                                                allAgentData.length > 0 && allAgentData.map((agent, index) => (
                                                    <option value={agent._id} key={index}>{agent.name}</option>
                                                ))
                                            }    
                                        </select><br/><br/>

                                        <label htmlFor="commentText" className="fs-5">Comment:</label><br/>
                                        <textarea id="commentText" rows={4} cols={50} required name="commentText" value={newCommentForm.commentText} onChange={updateNewCommentForm}></textarea> <br/><br/>

                                        <button className="btn btn-success mb-3" type="submit">Submit</button>
                                        <button className="btn btn-danger ms-3 mb-3" onClick={() => openOrCloseNewCommentWindow("close")}>Close</button>
                                    </form>
                                )
                        }
                        {commentLoading && <p>Loading...</p>}
                        {commentError && <p>{commentError}</p>}
                        {
                            commentsOfThisLead && commentsOfThisLead.length > 0 ? (
                                commentsOfThisLead.map((comment, index) => (
                                    <div className="card mb-3" key={index}>
                                        <div className="card-header position-relative">
                                            <span className="fs-5">{comment.author.name}</span>
                                            <span className="fs-5 me-3 position-absolute top-90 end-0">[{comment.createdAt}]</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="fs-5">Comment: {comment.commentText}</p>
                                        </div>
                                    </div>
                                ))
                            ): <p className="fs-5 fw-medium">No comments for this lead yet.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeadManagementScreen;