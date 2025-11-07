import React from "react";
import { motion, type Variants } from "framer-motion";
import Togglebutton from "@/components/ui/Togglebutton";
import UserCard from "@/components/cards/UserCard";
import { useDeleteUser, useGetUsers } from "@/hooks/userAdmin/useAdminUsers";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const AdminDashboard: React.FC = () => {
  const { data: users = [], isLoading, isError } = useGetUsers();
  const { mutateAsync: deleteUser } = useDeleteUser();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorState
        title="Error Loading Users"
        message="Unable to fetch user list. Please try again later."
      />
    );
  if (!users.length)
    return (
      <ErrorState
        title="No Users Found"
        message="There are no registered users yet."
      />
    );

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    toast.success("User deleted successfully");
  };

  return (
    <div className="p-2 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
        <Togglebutton />
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">👥 Manage Users</h2>
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-5">
          {users.map((user) => (
            <UserCard key={user._id} user={user} onDelete={handleDeleteUser} />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AdminDashboard;
