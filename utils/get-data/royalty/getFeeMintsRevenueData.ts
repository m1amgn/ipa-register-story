import { royaltyModuleContractABI, royaltyModuleContractAddress } from "@/utils/contracts/royaltyModuleContract";
import { getIpRoyaltyVault } from "./getIpRoyaltyVault";
import { getRevenuesAddedToVaultLogs } from "./getRevenuesAddedToVaultLogs";
import { vaultContractABI } from "@/utils/contracts/vaultContract";
import { getLogsFromMintAndRegisterIpAndMakeDerivativeEvent } from "./getLogsFromMintAndRegisterIpAndMakeDerivativeEvent";


export interface RevenueItem {
    childIpId: `0x${string}`;
    amount: bigint;
    token: `0x${string}`;
}

export async function getFeeMintsRevenuesData(ipId: `0x${string}`) {
    const royaltyVaultIpIdAddress = await getIpRoyaltyVault(
        royaltyModuleContractAddress,
        royaltyModuleContractABI,
        ipId
    );

    const revenues = await getRevenuesAddedToVaultLogs(
        0 as number,
        "latest",
        royaltyVaultIpIdAddress as `0x${string}`,
        vaultContractABI
    );

    const revenueData = await Promise.all(
        revenues.map(async ({ transactionHash, args }) => {
            const { amount, token } = args as { amount: bigint; token: `0x${string}` };
            const childIpId = await getLogsFromMintAndRegisterIpAndMakeDerivativeEvent(transactionHash);

            if (childIpId) {
                return { childIpId, amount, token };
            }
            return null;
        })
    );
    return revenueData.filter((rev): rev is RevenueItem => rev !== null);
}