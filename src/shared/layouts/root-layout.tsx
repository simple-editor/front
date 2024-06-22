import { Outlet } from "react-router-dom";
import Header from "@/shared/ui/header";
import { OverlayProvider } from "@/shared/hooks/use-oveylay/overlay-provider";

const RootLayout = () => {
  return (
    <OverlayProvider>
      <Header />
      <Outlet />
    </OverlayProvider>
  );
};

export default RootLayout;
