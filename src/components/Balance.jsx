import React from "react";
import ether from '../ether.png';

const Balance = (props) => {
    return <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
                <a
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={ether} className="App-logo" alt="logo" />
                </a>
                <h1><span>{props.balance} ETH</span></h1>
            </div>
        </main>
    </div>
}

export default Balance;