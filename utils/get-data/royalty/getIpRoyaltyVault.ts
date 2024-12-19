import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";

export const getIpRoyaltyVault = async (
    royaltyModuleAddress: `0x${string}`,
    royaltyModuleAbi: Abi,
    ipId: `0x${string}`
  ): Promise<`0x${string}`> => {
    return (await readContracts(
      royaltyModuleAddress,
      royaltyModuleAbi,
      "ipRoyaltyVaults",
      [ipId]
    )) as `0x${string}`;
  };
