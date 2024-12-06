import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";
import { getDerivativeIp } from "@/utils/get-data/derivatives/getDerivativeIp";


interface DerivativesAsset {
    id: `0x${string}`;
    name: string;
    imageUrl: string;
}

export const getDataForDerivativesList = async (
    ipaid: `0x${string}`,
    index: number,
  ): Promise<DerivativesAsset | null> => {
    try {
      const id = await getDerivativeIp(ipaid, index);
        
      const [{ name, imageUrl }] = await Promise.all([
        getNameAndImageIPA(id as `0x${string}`),
      ]);
  
      return {
        id,
        name,
        imageUrl,
      };

    } catch (error) {
      console.error(`Error in fetching data for index ${index}:`, error);
      return null;
    }
  };

