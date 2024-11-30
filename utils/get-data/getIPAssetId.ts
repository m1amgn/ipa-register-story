import { IPAssetRegistryContractABI, IPAssetRegistryContractAddress } from "@/utils/contracts/IPAssetRegistry";
import { readContracts } from "./readContracts";
import { Abi } from "viem";

export const getIPAssetId = async (
    nftContractAddress: string,
    index: number
): Promise<`0x${string}`> => {
    return (await readContracts(
        IPAssetRegistryContractAddress as `0x${string}`,
        IPAssetRegistryContractABI as Abi,
        "ipId",
        [process.env.NEXT_PUBLIC_X_CHAIN, nftContractAddress, index]
    )) as `0x${string}`;
};