'use client'

import { useAuth } from "@/hooks/useAuth";
import { Bell } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { user } = useAuth()
  return (
    <header className="w-full bg-white py-6 px-8 flex items-center">
      <div className="flex-5 flex justify-between items-center">
        <span className="text-h2 text-primary">Hello, {user?.full_name}</span>
        <div className="flex gap-8 items-center">
          <Link href={"/login"}>
            <Bell />
          </Link>
          <div className="rounded-full bg-primary-gray size-12" />
        </div>
      </div>
    </header>
  );
};

export default Header;
