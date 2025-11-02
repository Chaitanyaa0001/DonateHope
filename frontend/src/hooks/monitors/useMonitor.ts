


























// import { callAPI } from "../../CentralAPI/centralapi";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/redux/store";
// import type { MonitorData, NewMonitorData } from "@/responses/MonitorResponse";

// const monitorKeys = {
//   all: ["monitors"] as const,
//   user: ["monitors", "user"] as const,
//   detail: (id: string) => ["monitor", id] as const,
// };

// export const useMonitors = () => {
//   const queryClient = useQueryClient();
//   const auth = useSelector((state: RootState) => state.auth);

//   // 🟢 Get all monitors (admin only)
//   const useAllMonitorsQuery = useQuery({
//     queryKey: monitorKeys.all,
//     queryFn: async () => {
//       const res = await callAPI<{ data: MonitorData[] }>({
//         method: "get",
//         url: "/monitor",
//       });
//       return res.data;
//     },
//     enabled: auth.role === "admin",
//   });

//   // 🟢 Get user monitors
//   const useUserMonitorsQuery = useQuery({
//     queryKey: monitorKeys.user,
//     queryFn: async () => {
//       const res = await callAPI<{ data: MonitorData[] }>({
//         method: "get",
//         url: "/monitor/user",
//       });
//       return res.data;
//     },
//     enabled: !!auth.accessToken, // ✅ FIXED
//   });

//   const useMonitorById = (id: string) =>
//     useQuery({
//       queryKey: monitorKeys.detail(id),
//       queryFn: async () => {
//         const res = await callAPI<{ monitor: MonitorData }>({
//           method: "get",
//           url: `/monitor/analyze/${id}`,
//         });
//         return res.monitor;
//       },
//       enabled: !!id,
//     });

//   // 🟣 Create monitor
//   const usePostMonitorMutation = useMutation({
//     mutationFn: async (data: NewMonitorData) => {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("endpoint", data.endpoint);
//       formData.append("method", data.method);
//       formData.append("interval", String(data.interval));
//       if (data.headers) formData.append("headers", JSON.stringify(data.headers));
//       if (data.body) formData.append("body", JSON.stringify(data.body));
//       if (data.file) formData.append("file", data.file);

//       return await callAPI({
//         method: "post",
//         url: "/monitor",
//         data: formData,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: monitorKeys.user });
//     },
//   });

//   // 🟠 Delete monitor
//   const useDeleteMonitorMutation = useMutation({
//     mutationFn: async (id: string) => {
//       await callAPI({
//         method: "delete",
//         url: `/monitor/${id}`,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: monitorKeys.user });
//     },
//   });

//   return {
//     useAllMonitorsQuery,
//     useUserMonitorsQuery,
//     useMonitorById,
//     usePostMonitorMutation,
//     useDeleteMonitorMutation,
//   };
// };
