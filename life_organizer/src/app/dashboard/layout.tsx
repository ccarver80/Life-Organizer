"use client";
import DashboardHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { NextUIProvider } from "@nextui-org/react";

import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // Read url path and take last one to use as header title
  const pathname = usePathname().split("/").pop(); // Remove last string in url path
  const firstLetter = pathname?.charAt(0).toUpperCase(); // Capitalize first letter
  const remainingLetters = pathname?.slice(1); // get remaining letters
  const properPathName = ((firstLetter as string) + remainingLetters) as string; // combine first letter and remaining letters

  return (
    <NextUIProvider>
      <section>
        <div className="flex w-screen h-screen text-gray-700">
          {/* Sidebar Component */}
          <Sidebar />

          <div className="flex flex-col flex-grow">
            <DashboardHeader pathname={properPathName} />
            <div className="flex border-2 m-2 h-full rounded-xl border-slate-400">
              {children}
            </div>
          </div>

          {/* Component End  */}
        </div>
      </section>
    </NextUIProvider>
  );
}
