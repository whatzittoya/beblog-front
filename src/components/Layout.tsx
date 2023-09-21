import { useState } from "react";
import styles from "../styles/Layout.module.css";

import Nav from "./Nav";

function Layout({ children }) {
    const [navActive, setNavActive] = useState(false);

    return (
        <div lang="en" className='text-white mx-auto py-20'>
            <Nav navActive={navActive} setNavActive={setNavActive} />
            <main className={styles.main_style}>{children}</main>
        </div>
    );
}

export default Layout;