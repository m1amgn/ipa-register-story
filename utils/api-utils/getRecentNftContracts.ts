interface Contract {
    address: `0x${string}`;
    contract: `0x${string}`;
  }
  
  type RecentContracts = Contract[];
  
  export async function getRecentNftContracts(): Promise<RecentContracts | null> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/get_existing_contracts`;
  
    try {
      const response = await fetch(apiUrl, {
        next: { revalidate: 60 },
      });
  
      if (!response.ok) {
        console.error(`API error: ${response.statusText}`);
        return null;
      }
  
      // Преобразуем ответ API в массив контрактов
      const data: { [key: string]: string } = await response.json();
  
      const contractsArray: RecentContracts = Object.entries(data).map(([address, contract]) => ({
        address: address as `0x${string}`,
        contract: contract as `0x${string}`,
      }));
  
      return contractsArray.slice(-3); // Последние 3 контракта
    } catch (error) {
      console.error("Error in getRecentNftContracts:", error);
      return null;
    }
  }
  