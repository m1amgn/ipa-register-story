import { derivativeWorkflowsContractABI } from "@/utils/contracts/derivativeWorkflowsContracts";
import { licensingModuleContractABI } from "@/utils/contracts/licensingModule";
import { publicClient } from "@/utils/resources/publicClient";
import { decodeEventLog, decodeFunctionData } from "viem";
import { getTransaction, getTransactionReceipt } from "viem/actions";

export async function getLogsFromMintAndRegisterIpAndMakeDerivativeEvent(transactionHash: `0x${string}`) {
  try {
    const transaction = await getTransaction(publicClient, { hash: transactionHash });

    if (!transaction) {
      console.debug(`Transaction ${transactionHash} not found`);
      return;
    }
    const decodedMethod = decodeFunctionData({
      abi: derivativeWorkflowsContractABI,
      data: transaction.input,
    });

    if (decodedMethod.functionName === "mintAndRegisterIpAndMakeDerivative") {
      const receipt = await getTransactionReceipt(publicClient, { hash: transactionHash });

      if (!receipt) {
        return;
      }

      for (const log of receipt.logs) {
        try {
          const decodedLog = decodeEventLog({
            abi: licensingModuleContractABI,
            data: log.data,
            topics: log.topics,
          });

          if (decodedLog.eventName === "DerivativeRegistered") {
            const { childIpId } = decodedLog.args;
            return childIpId as `0x${string}`;
          }
        } catch (error) {
          console.debug(`Log not related to DerivativeRegistered:`, log);
        }
      }
    } else {
      console.debug(`Transaction ${transactionHash} is not a mintAndRegisterIpAndMakeDerivative method`);
    }
  } catch (error) {
    console.debug(`Error processing transaction ${transactionHash}:`, error);
  }
}