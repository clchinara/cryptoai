import React from 'react';
import { Divider, Select, Button } from 'antd';

const { useState } = React;

const defaultInv = 'inv1';

const invOptions = ['inv1', 'inv3'].map((value) => ({
    value: value,
    label: value
}))

const Eval = () => {
    const [inv, setInv] = useState(defaultInv);
    const handleSelect = (value) => {
        setInv(value);
    }
    const handleSubmit = () => {
        console.log('inv:', inv);
    }
    return (
        <div>
            <h1>Eval</h1>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <br></br>
                <p>Evaluate <Select defaultValue={defaultInv} onChange={handleSelect} style={{ width: '80px'}} options={invOptions}/> ND model. </p>
                <br></br>
                <Button onClick={handleSubmit} style={{width: 'calc(20% - 20px)', minWidth:'200px'}} type="primary" block>Run Eval</Button>
            </div>
        </div>
    )
}

export default Eval;