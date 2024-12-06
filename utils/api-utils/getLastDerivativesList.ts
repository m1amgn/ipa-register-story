import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";

type DerivativesList = string[];

interface AssetDetails {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
}

const getLastDerivatives = async (): Promise<DerivativesList> => {
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get_last_derivatives`,
    );
  const data = await response.json();
  return data;
};

export async function getLastDerivativesList() {
  const lastIPAs = await getLastDerivatives();
  const nameAndImageIpa = await Promise.all(
    lastIPAs.map(async (ipaid) => {
      try {
        const { name, imageUrl } = await getNameAndImageIPA(ipaid as `0x${string}`);
        return { id: ipaid, name, imageUrl };
      } catch (error) {
        console.error(`Failed to fetch details for IPA ${ipaid}:`, error);
        return null;
      }
    })
  );
  const filteredAssets: AssetDetails[] = nameAndImageIpa.filter(
    (detail): detail is AssetDetails => detail !== null
  );
  return filteredAssets;
}

