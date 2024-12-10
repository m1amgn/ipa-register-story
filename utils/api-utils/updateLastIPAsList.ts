export const updateLastIPAsList = async (address: `0x${string}`): Promise<any> => {
  const response = await fetch("/api/get_last_ipas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY_SET_OWNER_NFT_CONTRACT as string,
    },
    body: JSON.stringify({ IPAssetAddress: address }),
  });
  const data = await response.json();
  return data;
};
