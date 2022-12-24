import React, {useEffect, useState} from 'react'
import {useStateContext} from "../context";
import {DisplayCampaings} from "../components";

const Profile = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getUserCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <div className="text-amber-50 text-2xl">
            <DisplayCampaings
                title="Your campaigns"
                isLoading={isLoading}
                campaigns={campaigns}

            />
        </div>
    );
};
export default Profile;