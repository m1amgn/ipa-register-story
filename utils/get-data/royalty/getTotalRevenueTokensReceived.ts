import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";

export const getTotalRevenueTokensReceived = async (
    royaltyModuleAddress: `0x${string}`,
    royaltyModuleAbi: Abi,
    ipId: `0x${string}`,
    currencyTokensAddress: `0x${string}`
  ): Promise<bigint> => {
    return (await readContracts(
      royaltyModuleAddress,
      royaltyModuleAbi,
      "totalRevenueTokensReceived",
      [ipId, currencyTokensAddress]
    )) as bigint;
  };