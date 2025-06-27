import { useState } from "react";
import { Link } from "react-router-dom";
import useLeadAgentContext from "../context/LeadAgentContext";

const CreateNewSalesAgent = () => {
    const [salesAgentForm, setSalesAgentForm] = useState({
        name: '',
        email: ''
    });

    const [newSalesAgentALert, setNewSalesAgentALert] = useState(false);
    //function to create new sales agent.
    const newSalesAgentCreation = async (newData) =>{
        try{
            const response = await fetch(`https://apxgp-crm-app-backend.vercel.app/sales-agent`, {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log(response);
            if(!response.ok){
                throw "failed to add address";
            }
            console.log(response, response.json());
            const newSalesAgent = await response.json();
            if(newSalesAgent){
                console.log(newSalesAgent.message);
                setSalesAgentForm({
                    name: '',
                    email: ''
                });
                setNewSalesAgentALert((prev) => !prev);
                setTimeout(() => {
                    setNewSalesAgentALert((prev) => !prev);
                }, 3000);
            }
        }
        catch(error){
            console.log(error);
        }
    };

    //submit handler for new sales agent created.
    const handleSubmit = (event) => {
        event.preventDefault();
        if(salesAgentForm.name !== '' && salesAgentForm.email !== ''){
            newSalesAgentCreation(salesAgentForm);
        }
    };

    //function to update value to state.
    const updateValueToState = (event) => {
        const{value, name} = event.target;
        setSalesAgentForm((prev) => (
            {...prev, [name]: value}
        ));
    };

    return(
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">Add New Sales Agent</p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-md-2 border p-2">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="link-underline link-underline-opacity-0 fs-5" to={'/'}>Back to Dashboard</Link>
                    </div>
                    <div className="col-md-10 border p-2">
                        <form className="container mt-3 pb-5" onSubmit={handleSubmit}>
                            <label className="fs-5" htmlFor="salesAgentName">Sales Agent Name:</label><br/>
                            <input required type="text" id="salesAgentName" name="name" value={salesAgentForm.name} onChange={updateValueToState}/><br/><br/>

                            <label className="fs-5" htmlFor="salesAgentEmail">Email:</label><br/>
                            <input required type="email" id="salesAgentEmail" name="email" value={salesAgentForm.email} onChange={updateValueToState}/><br/><br/>
                            
                            <button className="btn btn-success" type="submit">Submit</button>
                            {newSalesAgentALert && (
                                <div className="mt-2 alert alert-success" role="alert">
                                    New Sales Agent Created.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateNewSalesAgent;