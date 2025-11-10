"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-gray-900 flex items-center">
            <span className="hidden sm:inline">Welcome, </span>
            <span className="sm:ml-1">{session?.user?.name || "User"}</span>
          </h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-1 hidden sm:block">
            {/* Today is{" "} */}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 lg:space-x-3 hover:bg-gray-50 rounded-lg p-2">
                <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarImage
                    src={
                      session?.user?.image ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    }
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email || "Employee"}
                  </p>
                </div>
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}