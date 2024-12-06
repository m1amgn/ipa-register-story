import { encodeFunctionData } from "viem";
import { publicClient } from "@/utils/resources/publicClient";
import { WalletClient, Account, Chain } from "viem";
import { licenseTokenContractAddress, licenseTokenContractABI } from "@/utils/contracts/licenseTokenContract";


export const licenseTokenBurnApproveTransaction = async (
  wallet: WalletClient,
  spenderAddress: `0x${string}`,
  tokenId: bigint,
) => {
  if (!wallet) throw new Error("Wallet client is not connected");

  const account = wallet.account as Account;
  if (!account) throw new Error("Wallet account is not defined");

  const chain = publicClient.chain as Chain;

  const data = encodeFunctionData({
    abi: licenseTokenContractABI,
    functionName: "approve",
    args: [spenderAddress, tokenId],
  });

  const baseTransaction = {
    account,
    to: licenseTokenContractAddress,
    data,
    value: BigInt("0"),
    chain,
  };

  try {
    const gasEstimate = await publicClient.estimateGas(baseTransaction);

    const transaction = {
      ...baseTransaction,
      gas: gasEstimate,
    };

    const txHash = await wallet.sendTransaction(transaction);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    return receipt;
  } catch (error) {
    console.error("Error sending approve transaction:", error);
    throw error;
  }
};
