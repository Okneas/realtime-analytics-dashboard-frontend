import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const DashboardLayout = ({ children }: LayoutProps<"/dashboard">) => {
  
  return (
    <div className="flex h-dvh w-full min-w-0 overflow-hidden bg-background-light">
      <SideBar />

      <div className="flex min-h-0 min-w-0 flex-5 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;