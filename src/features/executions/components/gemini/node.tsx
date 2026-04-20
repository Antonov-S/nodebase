"use client";

import { memo, useState } from "react";
import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";

import { fetchGeminiRealtimeToken } from "./actions";
import { BaseExecutionNode } from "./base-execution-node";
import { GeminiFormValues, GeminiDialog } from "./dialog";
import { UseNodeStatus } from "../../hooks/use-node-status";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";
import { AVAILABLE_MODELS_GEMINI } from "@/lib/available-models";

type GeminiNodeData = {
  variableName?: string;
  credentialId?: string;
  model?:
    | "gemini-3.1-flash-lite-preview"
    | "gemini-3-flash-preview"
    | "gemini-2.5-flash"
    | "gemini-2.5-flash-lite"
    | "gemini-2.5-flash-lite-preview-09-2025";
  systemPrompt?: string;
  userPrompt?: string;
};

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = UseNodeStatus({
    nodeId: props.id,
    channel: GEMINI_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGeminiRealtimeToken
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: GeminiFormValues) => {
    setNodes(nodes =>
      nodes.map(node => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values
            }
          };
        }

        return node;
      })
    );
  };

  const nodeData = props.data;
  const description = nodeData?.userPrompt
    ? `${nodeData.model || AVAILABLE_MODELS_GEMINI[0]}: ${nodeData.userPrompt.slice(0, 50)}...`
    : "Not configured";

  return (
    <>
      <GeminiDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/gemini.svg"
        name="gemini"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDubbleClick={handleOpenSettings}
      />
    </>
  );
});

GeminiNode.displayName = "GeminiNode";
