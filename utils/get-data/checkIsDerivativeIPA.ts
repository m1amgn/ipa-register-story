import { licenseRegistryAddress, licenseRegistryABI } from "@/utils/contracts/licenseRegistry";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";


export const checkIsDerivativeIPA = async (ipaid: `0x${string}`): Promise<boolean> => {
  const coreMetadata = await readContracts(
    licenseRegistryAddress as `0x${string}`,
    licenseRegistryABI as Abi,
    "isDerivativeIp",
    [ipaid]
  );
  return coreMetadata;
};