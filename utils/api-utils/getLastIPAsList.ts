import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";

type IPAList = string[];

interface AssetDetails {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
}

const getLastIPAs = async (): Promise<IPAList> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get_last_ipas`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const data = await response.json();
  return data;
};


export async function getLastIPAsList() {
  const lastIPAs = await getLastIPAs();

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


