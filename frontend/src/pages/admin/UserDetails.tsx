import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiCalendar,
  FiTrash2,
  FiArrowLeft,
  FiLink,
  FiClock,
} from "react-icons/fi";
import Togglebutton from "@/components/ui/Togglebutton";
import { useDeleteUser, useGetUserById } from "@/hooks/userAdmin/useAdminUsers";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMonitors } from "@/hooks/monitors/useMonitor";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetUserById(id as string);
  const { useDeleteMonitorMutation } = useMonitors();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const deleteMonitorMutation = useDeleteMonitorMutation;

  // 🌀 Loading & Error states
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorState
        title="Error Loading User"
        message="We couldn’t fetch user details. Please try again later."
        actionText="Back to Dashboard"
        onActionClick={() => navigate("/admin/dashboard")}
      />
    );

  if (!data?.user)
    return (
      <ErrorState
        title="User Not Found"
        message="This user may have been deleted or doesn’t exist."
        actionText="Go Back"
        onActionClick={() => navigate("/admin/dashboard")}
      />
    );

  // 🧹 Delete Monitor
  const handleDeleteMonitor = async (monitorId: string) => {
    try {
      await deleteMonitorMutation.mutateAsync(monitorId);
      toast.success("Monitor deleted successfully ✅");
      navigate(0); // refresh page
    } catch (err) {
      console.error("Failed to delete monitor", err);
      toast.error("Failed to delete monitor ❌");
    }
  };

  // 🧹 Delete User
  const handleDeleteUser = async () => {
    try {
      await deleteUser(data.user._id);
      toast.success("User deleted successfully ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to delete user", err);
      toast.error("Failed to delete user ❌");
    }
  };

  // ⬅ Back
  const handleBack = () => navigate("/admin/dashboard");

  return (
    <div className="min-h-screen p-4 sm:p-6 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-[#0c0c1d]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-semibold text-purple-500 hover:text-purple-400"
          >
            <FiArrowLeft /> Back
          </button>
          <h1 className="text-3xl font-bold">{data.user.fullname}</h1>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Togglebutton />
          <button
            onClick={handleDeleteUser}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            <FiTrash2 /> Delete User
          </button>
        </div>
      </div>

      {/* User Info */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-[#C800DE]/50 bg-white dark:bg-[#0d0b1d] p-5 mb-8 shadow-md hover:shadow-[0_0_20px_rgba(200,0,222,0.4)] transition-all"
      >
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <FiMail className="text-purple-400" /> {data.user.email}
          </p>
          <p className="flex items-center gap-2">
            <FiUser className="text-purple-400" /> Role:{" "}
            <span className="font-medium text-purple-500">{data.user.role}</span>
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar className="text-purple-400" /> Joined:{" "}
            {new Date(data.user.createdAt ?? "").toDateString()}
          </p>
          <p className="flex items-center gap-2">
            Status:{" "}
            {data.user.isVerified ? (
              <span className="text-green-400 font-semibold">✅ Verified</span>
            ) : (
              <span className="text-red-400 font-semibold">❌ Not Verified</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* User’s Monitors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">
          📊 User’s Monitors
        </h2>

        {data.monitors.length === 0 ? (
          <ErrorState
            title="No Monitors Found"
            message="This user doesn’t have any registered monitors."
            imageUrl="https://illustrations.popsy.co/violet/empty-state.svg"
          />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {data.monitors.map((monitor) => (
              <motion.div
                key={monitor._id}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl border border-[#C800DE]/40 bg-white dark:bg-[#0d0b1d] p-5 shadow-md hover:shadow-[0_0_20px_rgba(200,0,222,0.3)] transition-all"
              >
                <button
                  onClick={() => handleDeleteMonitor(monitor._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-600"
                  title="Delete monitor"
                >
                  <FiTrash2 />
                </button>

                <h3 className="text-lg font-semibold text-purple-500 mb-2">
                  {monitor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-2">
                  <FiLink className="text-purple-400" /> {monitor.endpoint}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <p>
                    Method:{" "}
                    <span className="font-medium text-purple-400">
                      {monitor.method}
                    </span>
                  </p>
                  <p>
                    Interval:{" "}
                    <span className="font-medium">{monitor.interval} min</span>
                  </p>
                  <p>
                    Uptime:{" "}
                    <span className="font-medium text-green-400">
                      {monitor.uptime}%
                    </span>
                  </p>
                  <p>
                    Latency:{" "}
                    <span className="font-medium text-yellow-400">
                      {monitor.latency} ms
                    </span>
                  </p>
                  <p>
                    Score:{" "}
                    <span className="font-medium text-blue-400">
                      {monitor.score}
                    </span>
                  </p>
                  <p className="flex items-center gap-1">
                    <FiClock className="text-purple-400" />{" "}
                    {new Date(monitor.createdAt).toDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default UserDetails;
