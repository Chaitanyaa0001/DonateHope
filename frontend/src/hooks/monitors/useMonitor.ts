import { callAPI } from "../../CentralAPI/centralapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { MonitorData, NewMonitorData } from "@/responses/MonitorResponse";

const monitorKeys = {
  all: ["monitors"] as const,
  user: ["monitors", "user"] as const,
  detail: (id: string) => ["monitor", id] as const,
};

export const useMonitors = () => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth);

  const useUserMonitorsQuery = useQuery({
    
    queryKey: monitorKeys.user,
    queryFn: async () => {
      console.log(auth.accessToken);
      const res = await callAPI<{ data: MonitorData[] }>({
        method: "get",
        url: "/monitor",
      });
      return res.data;
    },
    enabled: !!auth.accessToken, 
  });

  const useMonitorById = (id: string) =>
    useQuery({
      queryKey: monitorKeys.detail(id),
      queryFn: async () => {
        const res = await callAPI<{ data: MonitorData }>({
          method: "get",
          url: `/monitor/${id}`,
        });
        return res.data;
      },
      enabled: !!id,
    });

  const usePostMonitorMutation = useMutation({
    mutationFn: async (data: NewMonitorData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("endpoint", data.endpoint);
      formData.append("method", data.method);
      formData.append("interval", String(data.interval));
      if (data.headers) formData.append("headers", JSON.stringify(data.headers));
      if (data.body) formData.append("body", JSON.stringify(data.body));
      if (data.file) formData.append("file", data.file);

      return await callAPI({
        method: "post",
        url: "/monitor",
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: monitorKeys.user });
    },
  });

  const useDeleteMonitorMutation = useMutation({
    mutationFn: async (id: string) => {
      await callAPI({
        method: "delete",
        url: `/monitor/${id}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: monitorKeys.user });
    },
  });
  const useUserMonitorLogsQuery = useQuery({
  queryKey: ["monitorLogs"],
  queryFn: async () => {
    const res = await callAPI<{ data: { time: string; latency: number }[] }>({
      method: "get",
      url: "/monitor/logs",
    });
    return res.data;
  },
  enabled: !!auth.accessToken,
});
const useMonitorLogsById = (id: string) =>
  useQuery({
    queryKey: ["monitorLogs", id],
    queryFn: async () => {
      const res = await callAPI<{
        data: {
          timestamp: string;
          responseTime: number;
          statusCode: number;
          message: string;
        }[];
      }>({
        method: "get",
        url: `/monitor/logs/${id}`,
      });
      return res.data;
    },
    enabled: !!auth.accessToken && !!id,
  });




  return {
    useUserMonitorsQuery,
    useMonitorById,
    usePostMonitorMutation,
    useDeleteMonitorMutation,
    useUserMonitorLogsQuery,
    useMonitorLogsById
  };
};
