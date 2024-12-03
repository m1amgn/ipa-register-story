import { licenseRegistryAddress, licenseRegistryABI } from "@/utils/contracts/licenseRegistry";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";


export const getParentIpCount = async (ipaid: `0x${string}`): Promise<bigint> => {
  const parentIpCount = await readContracts(
    licenseRegistryAddress as `0x${string}`,
    licenseRegistryABI as Abi,
    "getParentIpCount",
    [ipaid]
  );
  console.log(parentIpCount);
  return parentIpCount;
};