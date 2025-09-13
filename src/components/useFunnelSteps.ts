import { useEffect, useState } from "react";

export interface FunnelStep {
  id: number;
  type: string;
  question?: string;
  options?: string[];
  description?: string;
  video_url?: string;
  checkout_url?: string;
}

export function useFunnelSteps() {
  const [steps, setSteps] = useState<FunnelStep[]>([]);

  useEffect(() => {
    fetch("/data/funnelSteps.json")
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, []);

  return steps;
}
