import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

import { useLocation } from "react-router-dom";

function Layout(props) {

  let location = useLocation();
  return (
    <>
      {location.pathname === "/" && !props.isMenu && <Header />}
      {location.pathname !== "/signup" &&
        location.pathname !== "/signin" &&
        props.isMenu && (
          <Navigation
            isMenuOpen={props.isMenuOpen}
            handleMenuClick={props.handleMenuClick}
            onClose={props.onClose}
          />
        )}
      <Outlet />
      {location.pathname !== "/signup" &&
        location.pathname !== "/signin" &&
        location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default Layout;
