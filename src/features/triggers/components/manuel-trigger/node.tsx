import { memo, useState } from "react";
import { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";

import { ManualTriggerDialog } from "./dialog";
import { BaseTriggerNode } from "../base-trigger-node";
import { fetchManualTriggerRealtimeToken } from "./actions";
import { UseNodeStatus } from "@/features/executions/hooks/use-node-status";
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = UseNodeStatus({
    nodeId: props.id,
    channel: MANUAL_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchManualTriggerRealtimeToken
  });

  const handleOepnSettings = () => setDialogOpen(true);

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        status={nodeStatus}
        onSettings={handleOepnSettings}
        onDubbleClick={handleOepnSettings}
      />
    </>
  );
});
