import { Bar, Doughnut} from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useLeadAgentContext from "../context/LeadAgentContext";

Chart.register(CategoryScale);

const ReportsScreen = () => {
    //fetching data from usecontext.
    const {allLeadData, allAgentData} = useLeadAgentContext();
    //console.log(allLeadData);

    const leadsClosed = allLeadData.length > 0 ? allLeadData.reduce((acc, curr) => curr.status === "Closed"? ++acc: acc, 0) : 0;
    const leadsInPipeline = allLeadData.length > 0 ? allLeadData.reduce((acc, curr) => curr.status !== "Closed"? ++acc: acc, 0) : 0;
    //console.log(leadsClosed, leadsInPipeline);

    const noOfNewLeads = allLeadData.reduce((acc, curr) => curr.status === "New"? ++acc:acc, 0);
    const noOfContactedLeads = allLeadData.reduce((acc, curr) => curr.status === "Contacted"? ++acc:acc, 0);
    const noOfQualifiedLeads = allLeadData.reduce((acc, curr) => curr.status === "Qualified"? ++acc:acc, 0);
    const noOfProposalSentLeads = allLeadData.reduce((acc, curr) => curr.status === "Proposal Sent"? ++acc:acc, 0);
    const noOfClosedLeads = allLeadData.reduce((acc, curr) => curr.status === "Closed"? ++acc:acc, 0);

    const leadsClosedByAgents = allLeadData.length>0? allLeadData.reduce((acc, curr, index) => {
        if(curr.status === "Closed"){
            acc.push(index+1);
        }else{
            acc.push(0);
        }
        return acc;
    }, []) : [];
    //console.log(leadsClosedByAgents)

    return(
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid position-relative py-3">
                        <p className="navbar-brand position-absolute top-50 start-50 translate-middle fs-2">APXGP CRM Reports</p>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="row mt-3 pb-5">
                    <div className="col-md-2 border p-2">
                        <p className="fw-medium fs-3">Sidebar</p>
                        <hr/>
                        <Link className="link-underline link-underline-opacity-0 fs-5" to={'/'}>Back To Dashboard</Link>
                    </div>
                    <div className="col-md-10 border p-2">
                        <p className="fw-medium fs-3">Report Overview</p>
                        <hr/>
                        <p className="fs-5 text-decoration-underline">Total Leads Closed And In Pipeline:</p>
                        <div style={{width: "400px", height: "400px"}}>
                            <Doughnut
                                data={{
                                    labels: ["Closed", "In Pipeline"],
                                    datasets:[
                                        {
                                            label: "Leads are",
                                            data: [leadsClosed, leadsInPipeline],
                                            backgroundColor: [
                                                "#f3ba2f",
                                                "#2a71d0"
                                            ],
                                            borderColor: "black",
                                            borderWidth: 2
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                        display: true,
                                        text: "Total Leads Closed And In Pipeline"
                                        }
                                    }
                                }}
                            />
                        </div>
                        <hr/>
                        <p className="fs-5 text-decoration-underline">Leads Closed By Sales Agent:</p>
                        <div style={{width: "700px", height: "400px"}}>
                            <Bar
                                data={{
                                    labels: allLeadData.length>0 ? allLeadData.map((lead) => lead.name) : [],
                                    datasets:[
                                        {
                                            label: "Closed by sales agent",
                                            data: leadsClosedByAgents,
                                            backgroundColor: [
                                                "rgba(75,192,192,1)",
                                                "#ecf0f1",
                                                "#50AF95",
                                                "#f3ba2f",
                                                "#2a71d0"
                                            ],
                                                borderColor: "black",
                                                borderWidth: 2
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                        display: true,
                                        text: "Leads Closed By Sales Agent"
                                        }
                                    }
                                }}
                            />
                        </div>
                        <hr/>
                        <p className="fs-5 text-decoration-underline
                        ">Lead Status Distribution:</p>
                        <div style={{width: "500px", height: "500px"}}>
                            <Doughnut
                                data={{
                                    labels: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'],
                                    datasets:[
                                        {
                                            label: "Leads",
                                            data: [noOfNewLeads, noOfContactedLeads, noOfQualifiedLeads, noOfProposalSentLeads, noOfClosedLeads],
                                            backgroundColor: [
                                                "rgba(75,192,192,1)",
                                                "#ecf0f1",
                                                "#50AF95",
                                                "#f3ba2f",
                                                "#2a71d0"
                                            ],
                                                borderColor: "black",
                                                borderWidth: 2
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                        display: true,
                                        text: "Lead Status Distribution"
                                        }
                                    }
                                    
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReportsScreen;