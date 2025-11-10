"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { LayoutDashboard, Users } from "lucide-react";

export default function FinanceLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (status === "authenticated") {
      const userRoles = session?.user?.roles || [];

      if (!userRoles.includes("finance")) {
        router.push("/");
        return;
      }

      setIsAuthorized(true);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        menuOptions={[
          {
            key: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
          },
          // {
          //   key: "setting",
          //   label: "Setting",
          //   icon: <Users size={20} />,
          // },
        ]}
        currentMenu="dashboard"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
