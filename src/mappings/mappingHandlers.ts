import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = BigInt(event.blockNumber);

  const { args } = event;
  if (args) {
    pangolinApprovalRecord.owner = args.owner;
    pangolinApprovalRecord.spender = args.spender;
    pangolinApprovalRecord.amount = BigInt(args.value.toString());
  }

  await pangolinApprovalRecord.save();
}
