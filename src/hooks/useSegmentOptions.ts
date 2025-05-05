import { useState, useEffect } from "react";
import { getServiceOptions } from "@/services/api";

interface SegmentOption {
  id: string;
  label: string;
}

export const useSegmentOptions = () => {
  const [segmentOptions, setSegmentOptions] = useState<SegmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSegmentOptions = async () => {
      try {
        const options = await getServiceOptions();
        setSegmentOptions(options);
        setError(null);
      } catch (err) {
        console.error("Error loading segment options:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load segment options")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSegmentOptions();
  }, []);

  return { segmentOptions, loading, error };
};
