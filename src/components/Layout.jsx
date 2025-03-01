import { useEffect, useState } from "react";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/components/calcite-menu";
import "@esri/calcite-components/components/calcite-menu-item";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import "@esri/calcite-components/components/calcite-shell";

const Layout = ({ children }) => {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === "/" || window.location.pathname === "/home");
  }, []);

  return (
    <calcite-shell content-behind class="calcite-mode-light">
      <calcite-navigation slot="header">
        <calcite-navigation-logo heading="Power Plants" heading-level="1" slot="logo"></calcite-navigation-logo>

        {!isHome && (
          <calcite-menu slot="content-end">
            <calcite-menu-item icon-start="home" text-enabled href="/">
            </calcite-menu-item>
          </calcite-menu>
        )}
      </calcite-navigation>

      {children}
    </calcite-shell>
  );
};

export default Layout;
