const ManagementDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Management Dashboard</h1>

      {/* Example widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">User Management</div>
        <div className="bg-white p-4 rounded shadow">Organization Overview</div>
        <div className="bg-white p-4 rounded shadow">Reports & Analytics</div>
        <div className="bg-white p-4 rounded shadow">Settings</div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
