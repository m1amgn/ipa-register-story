import { licenseRegistryAddress, licenseRegistryABI } from "@/utils/contracts/licenseRegistry";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";


export const getDerivativeIpCount = async (ipaid: `0x${string}`): Promise<bigint> => {
  const derivativeIpCount = await readContracts(
    licenseRegistryAddress as `0x${string}`,
    licenseRegistryABI as Abi,
    "getDerivativeIpCount",
    [ipaid]
  );
  console.log(derivativeIpCount);
  return derivativeIpCount;
};