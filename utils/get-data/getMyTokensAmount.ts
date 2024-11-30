import { Abi } from "viem";
import { spgTokenContractAbi } from "@/utils/contracts/spgTokenContract";
import { readContracts } from "@/utils/get-data/readContracts";


export const getMyTokensAmount = async (
    nftContractAddress: string,
    address: `0x${string}`
): Promise<BigInt> => {
    const quantity = await readContracts(
        nftContractAddress as `0x${string}`,
        spgTokenContractAbi as Abi,
        "balanceOf",
        [address]
    );
    return quantity as BigInt;
};