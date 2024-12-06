import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";
import { getParentIp } from "@/utils/get-data/parents/getParentIp";


interface ParentsAsset {
    id: `0x${string}`;
    name: string;
    imageUrl: string;
}

export const getDataForParentsList = async (
    ipaid: `0x${string}`,
    index: number,
  ): Promise<ParentsAsset | null> => {
    try {
      const id = await getParentIp(ipaid, index);
  
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

