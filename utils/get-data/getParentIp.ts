import { licenseRegistryAddress, licenseRegistryABI } from "@/utils/contracts/licenseRegistry";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";


export const getParentIp = async (ipaid: `0x${string}`, index: number): Promise<`0x${string}`> => {
  const parentIp = await readContracts(
    licenseRegistryAddress as `0x${string}`,
    licenseRegistryABI as Abi,
    "getParentIp",
    [ipaid, index]
  );
  return parentIp;
};