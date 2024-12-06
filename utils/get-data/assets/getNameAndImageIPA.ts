import { getIPAMetadata } from "@/utils/get-data/assets/getIPAMetadata";

interface nameAndImageIPA {
    name: string;
    imageUrl: string;
}

export const getNameAndImageIPA = async (
    id: `0x${string}`
): Promise<nameAndImageIPA> => {

    const coreMetadata = await getIPAMetadata(id as `0x${string}`);

    const tokenUri = coreMetadata.nftTokenURI;
    if (!tokenUri) throw new Error("Missing token URI");

    const metadataResponse = await fetch(tokenUri);
    if (!metadataResponse.ok) {
        throw new Error(`Failed to fetch token URI metadata for ${tokenUri}`);
    }

    const metadata = await metadataResponse.json();
    if (!metadata.name || !metadata.image)
        throw new Error("Metadata missing 'name' or 'image' field");

    return { name: metadata.name, imageUrl: metadata.image };
};