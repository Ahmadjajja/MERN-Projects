import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaMoneyCheckAlt, FaHeart } from "react-icons/fa"
import { MdAccountBalance } from "react-icons/md"
import { Link } from "react-router-dom";
function Sidebar() {
    return (
        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}><Link to="/dashboard">Dashboard</Link></MenuItem>
                <MenuItem icon={<FaGem />}><Link to="/dashboard/viewAccounts">Accounts</Link></MenuItem>
                <MenuItem icon={<FaGem />}><Link to="/dashboard/viewTransactions">Transactions</Link></MenuItem>
                {/* <SubMenu title="Components" icon={<FaHeart />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu> */}
            </Menu>
            {/* <Menu iconShape="square">
                    <Link to="/dashboard"><MenuItem icon={<FaGem />}>Dashboard</MenuItem></Link>
                </Menu>
                <Link to="/dashboard/accounts"><MenuItem icon={<MdAccountBalance />}>Accounts</MenuItem></Link>
                <MenuItem icon={<FaMoneyCheckAlt />}>Transactions<Link to="/dashboard/transactions"></Link></MenuItem> */}
        </ProSidebar>
    )
}

export default Sidebar