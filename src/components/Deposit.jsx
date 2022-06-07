import React, { useState } from "react";

const Deposit = (props) => {

    const [amount, setAmount] = useState();

    const onDeposit = () => {
        props.onDeposit(amount)
        setAmount(0);
    }
    const onWithdraw = () => {
        props.onWithdraw(amount)
        setAmount(0);
    }

    return <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center ">
            <input type="text" class="form-control mid-width" placeholder="Amount in ethers" aria-label="Amount" aria-describedby="basic-addon2" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div><button onClick={onDeposit} type="button" class="btn btn-success">Deposit</button></div>
            <div><button onClick={onWithdraw} type="button" class="btn btn-info">Withdraw</button></div>
        </main>
    </div>

}
export default Deposit;