import React from 'react';
import { Outlet } from "react-router-dom";
import MainNavigation from './MainNavigation';

function Layout() {
  return (
    <>
      <div>
        <MainNavigation />
        <main>
          <Outlet /> {/* Here React render the child routes, is provider by react route*/}
        </main>
      </div>
    </>
  );
}

export default Layout;