"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.roles) {
      const roles = session.user.roles;
      console.log("User roles:", session.user.roles);

      if (roles.includes("finance")) {
        router.push("/dashboard/finance");
      } else if (roles.includes("employee")) {
        router.push("/dashboard/employee");
      }else if(roles.includes("manager")){
        router.push("/dashboard/manager");
      }
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
<div className="min-h-screen flex">
      {/* Left Side - Gradient Welcome */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-12">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold mb-6 text-gray-800">
            Reimbursement Portal
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Submit and track your expense reimbursements seamlessly with our secure platform.
          </p>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              LOGIN
            </h2>
          </div>

          <button
            onClick={() => signIn("keycloak")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign In
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Secure authentication powered by Keycloak
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
    </div>
  );
}
