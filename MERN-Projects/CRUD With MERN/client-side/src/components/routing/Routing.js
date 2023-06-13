import React from 'react'
import AddOrder from "../AddOrder/AddOrder"
import ViewOrder from "../ViewOrder/ViewOrder";
import { Route, Routes } from "react-router-dom";
function Routing() {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<AddOrder />} />
                <Route path='/ViewOrder' element={<ViewOrder />} />
            </Routes>
        </div>
    )
}

export default Routing