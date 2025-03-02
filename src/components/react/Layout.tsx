/// <reference types="@esri/calcite-components/types/react" />

import { useEffect, useState } from "react";

const Layout = ({ children }: any) => {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(
      window.location.pathname === "/" || window.location.pathname === "/home"
    );

    // Dynamically import Calcite components only in the browser
    import("@esri/calcite-components/components/calcite-menu");
    import("@esri/calcite-components/components/calcite-menu-item");
    import("@esri/calcite-components/components/calcite-navigation");
    import("@esri/calcite-components/components/calcite-navigation-logo");
    import("@esri/calcite-components/components/calcite-shell");
  }, []);

  return (
    <calcite-shell content-behind className="calcite-mode-light">
      <calcite-navigation slot="header">
        <calcite-navigation-logo
          heading="Power Plants"
          heading-level="1"
          slot="logo"
        ></calcite-navigation-logo>
        {!isHome && (
          <calcite-menu slot="content-end" label="home">
            <calcite-menu-item
              label="home-button"
              icon-start="home"
              text-enabled
              href="/"
            ></calcite-menu-item>
          </calcite-menu>
        )}
      </calcite-navigation>
      {children}
    </calcite-shell>
  );
};

export default Layout;
