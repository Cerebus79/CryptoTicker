import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/store";


function SlideMenu()
{
    const {cryptStore} = useStore();
    const openMenu = 'left-0';
    const closeMenu = 'left-[-250px]';
    let styling='';

   cryptStore.showSlideMenu ? styling = openMenu : styling = closeMenu;


function hideMenu()
{
    cryptStore.ToggleSlideMenu(false);
}

    return(
<>
    <div id="side-menu" className={`fixed top-0 ${styling} w-[240px] h-screen z-50 bg-gray-700 p-5 flex flex-col space-y-5 text-white duration-300`}>
        <button className="text-right text-4xl" onClick={hideMenu}>&times;</button>
        <Link to='/' className="hover:text-amber-500" onClick={hideMenu}>Home</Link>
        <Link to='/' className="hover:text-amber-500" onClick={hideMenu}>Coins</Link>
        <Link to='/exchanges' className="hover:text-amber-500" onClick={hideMenu}>Exchanges</Link>
        <Link to='/about' className="hover:text-amber-500" onClick={hideMenu}>About</Link>
    </div>

    </>
    );
}

export default observer(SlideMenu)