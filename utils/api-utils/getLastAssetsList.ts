import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";


interface AssetDetails {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
}

export async function getLastAssetsList(page = 1, limit = 8, asset = "ipas") {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get_last_${asset}?page=${page}&limit=${limit}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const { data, total } = await response.json();

  const nameAndImageIpa = await Promise.all(
    data.map(async (ipaid: string) => {
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

  return { assets: filteredAssets, total };
}
