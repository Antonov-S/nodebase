import { NodeExecutor } from "./types";
import { NodeType } from "@/generated/prisma/enums";
import { httpRequestExecutor } from "../components/http-request/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/manuel-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
