"use client";
import DashboardHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex w-screen h-screen text-gray-700">
        {/* Sidebar Component */}
        <Sidebar />

        <div className="flex flex-col flex-grow">
          <DashboardHeader />

          {children}
        </div>
        {/* Component End  */}
      </div>
    </section>
  );
}
