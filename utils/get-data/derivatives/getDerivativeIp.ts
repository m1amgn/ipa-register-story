import { licenseRegistryAddress, licenseRegistryABI } from "@/utils/contracts/licenseRegistry";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";


export const getDerivativeIp = async (ipaid: `0x${string}`, index: number): Promise<`0x${string}`> => {
  const derivativeIp = await readContracts(
    licenseRegistryAddress as `0x${string}`,
    licenseRegistryABI as Abi,
    "getDerivativeIp",
    [ipaid, index]
  );
  return derivativeIp;
};