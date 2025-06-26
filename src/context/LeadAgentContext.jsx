import { createContext, useContext, useState } from "react";
import useFetch from "../useFetch";

const LeadAgentContext = createContext();

const useLeadAgentContext = () => useContext(LeadAgentContext);
export default useLeadAgentContext;

export function LeadAgentProvider({children}) {
    //console.log(children)
    const [refetchLeadData, setRefetchLeadData] = useState(false);
    const [refetchCommentData, setRefetchCommentData] = useState(false);

    const {loading: leadLoading, data: leadData, error: leadError} = useFetch(`https://apxgp-crm-app-backend.vercel.app/leads?updated=${refetchLeadData}`);
    const allLeadData = leadData? leadData.data || leadData.message : [];
    
    const {loading: agentLoading, data: agentData, error: agentError} = useFetch(`https://apxgp-crm-app-backend.vercel.app/sales-agent`);
    const allAgentData = agentData? agentData.data || agentData.message : [];

    const {loading: commentLoading, data: commentData, error: commentError} = useFetch(`https://apxgp-crm-app-backend.vercel.app/comments?updated=${refetchCommentData}`);
    const allCommentData = commentData? commentData.data || commentData.message : [];

    return(
        <div>
            <LeadAgentContext.Provider value={{
                leadLoading, allLeadData, leadError, 
                agentLoading, allAgentData, agentError, 
                setRefetchLeadData, setRefetchCommentData,
                commentLoading, allCommentData, commentError
            }}>
                {children}
            </LeadAgentContext.Provider>
        </div>
    )
}