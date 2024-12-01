export const getNftContract = async (address: `0x${string}`): Promise<`0x${string}`> => {
    const response = await fetch(
        `/api/get_nft_contract_by_address?address=${address}`,
        {
          next: { revalidate: 20 }
        }
      );
    const data = await response.json();
    return data.nftContract;
};

