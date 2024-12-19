import { publicClient } from "@/utils/resources/publicClient";
import { Abi, AbiEvent, decodeEventLog } from "viem";
import { getLogs } from "viem/actions";

export async function getRevenuesAddedToVaultLogs(fromBlock: number, toBlock: number | 'latest', contractAddress: `0x${string}`, contractAbi: Abi) {
    const revenueEvent = contractAbi.find(
      (item) => item.type === 'event' && item.name === 'RevenueTokenAddedToVault'
    ) as AbiEvent;

    if (!revenueEvent || revenueEvent.type !== "event") {
      throw new Error("RevenueTokenAddedToVault event not found or invalid in ABI");
    }

    try {
      const logs = await getLogs(publicClient, {
        address: contractAddress,
        event: revenueEvent as AbiEvent,
        fromBlock: BigInt(fromBlock),
        toBlock: toBlock === 'latest' ? 'latest' : BigInt(toBlock),
      });

      const decodedLogs = logs.map((log) => {
        const decoded = decodeEventLog({
          abi: [revenueEvent],
          data: log.data,
          topics: log.topics,
        });

        return {
          ...decoded,
          transactionHash: log.transactionHash,
        };
      });
      return decodedLogs;
    } catch (error) {
      console.error('Error to get logs:', error);
      throw error;
    }
  }