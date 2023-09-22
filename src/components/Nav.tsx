import Style from "../styles/Nav.module.css";
import Link from "next/link";



const menu_itemList = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

function Nav({ navActive, setNavActive }) {


  return (
    <div className={Style.navBar + ' bg-gradient-to-r from-blue-800 to-indigo-900'}>

      <Link href={"/"} onClick={() => {
        setNavActive(false)
      }}><h1 className="font-mono text-2xl">Belajar Fisika</h1></Link>
      <div
        className={Style.mobiNav}
        onClick={() => {
          return setNavActive(!navActive);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/*  */}
      <div className={`${Style.navItems} ${navActive ? Style.active : ""}`}>
        <ul className={Style.navItem}>
          {menu_itemList.map((menu) => {
            return (
              <div
                key={menu.name}
                onClick={() => {
                  setNavActive(false);
                }}
              >
                <Nav_menu  {...menu} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>

  );
}
export function Nav_menu({ name, href }) {
  return (
    <Link href={href} >
      <li>{name}</li>
    </Link>
  );
}
export default Nav;