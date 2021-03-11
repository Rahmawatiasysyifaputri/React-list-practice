import React from "react"
import Alert from "./components/Alert";
import data from "./ArrayData"
import Counter from "./components/Counter";
import Gallery from './pages/Gallery'
import LingkunganHidup from './pages/Lingkunganhidup'
import { Route } from "react-router-dom";

class Main extends React.Component{
    render(){
        return (
            <div className="container">
                <Counter />
                <Counter />
            </div>
        )
    }
}
export default Main;