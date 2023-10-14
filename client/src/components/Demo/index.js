import React from 'react';
import { Space, Select, Input, Divider, Button, Spin } from 'antd';

import { DEMO_ENDPOINT } from '../../constants/endpoints';
import { postData } from '../../utils/fetcher';

const { useState, useEffect } = React;

const defaultNumCiphertexts = 4;
const defaultNumRounds = 5
const defaultCiphertext = '00000000';

const numCiphertextsOptions = [4, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const numRoundsOptions = [5, 6, 7, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const renderResponseData = (responseData) => {
    const { numCiphertexts, pred, prob } = responseData;
    const realOrRandom = pred ? 'real' : 'random';
    const predColor = pred ? '#52c41a' : '#f5222d';
    const quartetOrOctet = numCiphertexts === 4 ? 'quartet' : 'octet'
    return (
        <div>
            <h2>This is a <span style={{color: `${predColor}`}}>{realOrRandom}</span> ciphertext {quartetOrOctet}.</h2>
            <p>Probability: {prob}</p>
        </div>
    )
}

const Demo = () => {
    const [numCiphertexts, setNumCiphertexts] = useState(defaultNumCiphertexts);
    const [ciphertexts, setCiphertexts] = useState(Array(defaultNumCiphertexts).fill('00000000'));
    const [numRounds, setNumRounds] = useState(defaultNumRounds);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSelectNumCiphertexts = (value) => {
        const numCiphertexts = parseInt(value);
        setNumCiphertexts(numCiphertexts);
    }
    const handleSelectNumRounds = (value) => {
        const numRounds = parseInt(value);
        setNumRounds(numRounds);
    }
    useEffect(() => {
        setCiphertexts(Array(numCiphertexts).fill(defaultCiphertext));
    }, [numCiphertexts]);
    const handleInputChange = (e) => {
        const newCiphertexts = [...ciphertexts];
        const i = parseInt(e.target.id);
        newCiphertexts[i - 1] = e.target.value;
        setCiphertexts(newCiphertexts);
    }
    const renderInputFields = (numCiphertexts) => {
        const inputFields = [];
        for (let i = 0; i < numCiphertexts / 4; i++) {
            inputFields.push(
                <Space key={`sp-${i}`}style={{ width: 'calc(50% - 20px)'}} direction="vertical">
                    <Input id={`${(i * 4) + 1}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultCiphertext} value={ciphertexts[(i * 4) + 1 - 1]} />
                    <Input id={`${(i * 4) + 2}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultCiphertext} value={ciphertexts[(i * 4) + 2 - 1]} />
                    <Input id={`${(i * 4) + 3}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultCiphertext} value={ciphertexts[(i * 4) + 3 - 1]} />
                    <Input id={`${(i * 4) + 4}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultCiphertext} value={ciphertexts[(i * 4) + 4 - 1]} />
                </Space>
            )
        }
        return inputFields
    }
    const handleSubmit = async () => {
        setErrorMessage(null);
        setIsLoading(true);
        console.log('numCiphertexts:', numCiphertexts, 'ciphertexts:', ciphertexts, 'numRounds:', numRounds);
        const data = {
            numCiphertexts,
            ciphertexts,
            numRounds
        }
        try {
            const response = await postData(DEMO_ENDPOINT, data);
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
            <h1>Demo</h1>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <br></br>
                <p>Input <Select defaultValue={defaultNumCiphertexts} onChange={handleSelectNumCiphertexts} style={{ width: '60px'}} options={numCiphertextsOptions}/> <b>32-bit</b> ciphertexts for <Select defaultValue={defaultNumRounds} onChange={handleSelectNumRounds} style={{ width: '60px'}} options={numRoundsOptions}/> rounds of Speck: </p>
                <br></br>
                {renderInputFields(numCiphertexts)}
                <br></br>
                <br></br>
                <br></br>
                <Button onClick={handleSubmit} style={{width: 'calc(20% - 20px)', minWidth:'200px'}} type="primary" block>Run ND</Button>
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

export default Demo;