import { useState } from "react";
import styles from "../styles/Layout.module.css";

import Nav from "./Nav";

function Layout({ children }) {
    const [navActive, setNavActive] = useState(false);

    return (
        <div lang="en" className='bg-slate-900 text-white mx-auto py-20 px-4 '>
            <Nav navActive={navActive} setNavActive={setNavActive} />
            <main className={styles.main_style}>{children}</main>
        </div>
    );
}

export default Layout;