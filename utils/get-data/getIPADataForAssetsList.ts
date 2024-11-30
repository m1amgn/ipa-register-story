import { checkIsDerivativeIPA } from "@/utils/get-data/checkIsDerivativeIPA";
import { getNameAndImageIPA } from "@/utils/get-data/getNameAndImageIPA";
import { getLicenseTermsData } from "@/utils/get-data/getLicenseTermsData";
import { getIPAssetId } from "@/utils/get-data/getIPAssetId";

interface IPAsset {
    id: `0x${string}`;
    name: string;
    imageUrl: string;
    licenseId?: number;
}

export const getIPADataForAssetsList = async (
    nftContractAddress: string,
    index: number,
    isDerivativeFlag: boolean
  ): Promise<IPAsset | null> => {
    try {
      const id = await getIPAssetId(nftContractAddress, index);
  
      const [{ name, imageUrl }, licenses, isDerivativeId] = await Promise.all([
        getNameAndImageIPA(id as `0x${string}`),
        getLicenseTermsData(id as `0x${string}`),
        checkIsDerivativeIPA(id)
      ]);
  
  
      if (isDerivativeFlag && !isDerivativeId) return null;
      if (!isDerivativeFlag && isDerivativeId) return null;
  
      const mainLicense = licenses[0];
      return {
        id,
        name,
        imageUrl,
        licenseId: mainLicense ? parseInt(mainLicense.id, 10) : undefined,
      };
    } catch (error) {
      console.error(`Error in fetching data for index ${index}:`, error);
      return null;
    }
  };

