import React, {useContext, createContext} from "react";

import {useAddress, useContract, useMetamask, useContractWrite,useContractRead} from "@thirdweb-dev/react";
import {ethers} from "ethers";

const Context = createContext({});

export const ContextProvider = ({children}) => {
    const {contract} = useContract('0xc557a64a67D74bd49D1ac1d3eD89AF1F83b50862');

    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();
    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, //owner
                form.title, // _title
                form.description, //_desc
                form.target, // _target
                new Date(form.deadline).getTime(), // _deadline
                form.image //_image
            ])
        } catch (err) {
            console.log('err', err)

        }
    }
    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        const parsedCampaings = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
        return parsedCampaings;
    }
    const getUserCampaigns = async () => {
        const allCampaings = await getCampaigns();
        const filtredCampaigns = allCampaings.filter((campaign)=>campaign.owner === address);
        return filtredCampaigns;

    }


    const donate = async (pId,amount) =>{
        const data = await contract.call('donateToCampaign',pId, {
            value:ethers.utils.parseEther(amount)
        })
        return data;
    };

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }
    return (
        <Context.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}
        >

            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
