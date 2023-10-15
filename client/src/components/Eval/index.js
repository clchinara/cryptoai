import React from 'react';
import { Divider, Select, Button, Table, Spin } from 'antd';

import { EVAL_ENDPOINT } from '../../constants/endpoints';
import { postData } from '../../utils/fetcher';

const { useState } = React;

const defaultInv = 'inv1';

const invOptions = ['inv1', 'inv3'].map((value) => ({
    value: value,
    label: value
}))

const columns = [
    {
        title: 'Rounds', 
        dataIndex: 'rounds',
        rowScope: 'row',
    }, 
    {
        title: 'Accuracy',
        dataIndex: 'acc',
        key: 'acc'
    }, 
    {
        title: 'TPR',
        dataIndex: 'tpr',
        key: 'tpr'
    },
    {
        title: 'TNR',
        dataIndex: 'tnr',
        key: 'tnr'
    },
    {
        title: 'MSE',
        dataIndex: 'mse',
        key: 'mse'
    }
]

const renderResponseData = (responseData) => {
    return (
        <div>
            <Table dataSource={responseData} columns={columns} bordered />
        </div>
    )
}

const Eval = () => {
    const [inv, setInv] = useState(defaultInv);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSelect = (value) => {
        setInv(value);
    }
    const handleSubmit = async () => {
        setErrorMessage(null);
        setResponseData(null);
        setIsLoading(true);
        console.log('inv:', inv);
        const data = { inv }
        try {
            const response = await postData(EVAL_ENDPOINT, data);
            const { data: responseData, isSuccess, message } = response
            if (isSuccess) {
                setResponseData(responseData)
                console.log('responseData:', responseData)
            } else {
                throw new Error(message)
            }
        } catch (err) {
            setErrorMessage(err.message)
            console.log('err:', err.message)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <h1>Eval</h1>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <br></br>
                <p>Evaluate our <Select data-testid='inv' defaultValue={defaultInv} onChange={handleSelect} style={{ width: '80px'}} options={invOptions}/> ND model. </p>
                <br></br>
                <Button data-testid='submitEval' onClick={handleSubmit} style={{width: 'calc(20% - 20px)', minWidth:'200px'}} type="primary" block>Run Eval</Button>
            </div>
            <br></br>
            <div style={{textAlign: 'center', margin: '10px 0'}}>
                <span style={{color: '#f5222d'}}>{errorMessage}</span>
            </div>
            <br></br>
            <Divider />
            <div style={{margin: '70px 0', textAlign: 'center'}}>
                {isLoading ? (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                ) : responseData ? renderResponseData(responseData) : (<div></div>)}
            </div>
        </div>
    )
}

export default Eval;