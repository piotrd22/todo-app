import type { FC, PropsWithChildren } from "react";

interface MainLayoutProps {
  className?: string;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  className = "",
  children,
}) => (
  <div className="container mx-auto p-3 min-h-screen">
    <main
      className={className ? className : "container mx-auto flex flex-auto"}
    >
      {children}
    </main>
  </div>
);

export default MainLayout;
