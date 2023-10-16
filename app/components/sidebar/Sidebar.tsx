import getCurrentUser from "@/app/actions/getCurrentUser";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
      <MobileFooter />
    </div>
  );
}

export default Sidebar;
