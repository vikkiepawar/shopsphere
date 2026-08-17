import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setProfile(res.data.user);
      } catch (error) {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">
              {profile?.name || user?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">
              {profile?.email || user?.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold capitalize">
              {profile?.role || user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-8 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
