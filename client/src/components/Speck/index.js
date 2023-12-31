import React from 'react';
import { Space, Select, Input, Divider, Button, Spin } from 'antd';

import { SPECK_ENDPOINT } from '../../constants/endpoints';
import { postData } from '../../utils/fetcher';

const { useState, useEffect } = React;

const defaultNumPlaintexts = 4;
const defaultNumRounds = 5;
const defaultPlaintext = '00000000';

const numPlaintextsOptions = [4, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const numRoundsOptions = [5, 6, 7, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const renderResponseData = (responseData) => {
    const { ciphertexts } = responseData;
    console.log('ciphertexts', ciphertexts);
    return (
        <div>
            <h2>{ciphertexts.toString()}</h2>
        </div>
    )
}

const Demo = () => {
    const [numPlaintexts, setNumPlaintexts] = useState(defaultNumPlaintexts);
    const [plaintexts, setPlaintexts] = useState(Array(defaultNumPlaintexts).fill('00000000'));
    const [numRounds, setNumRounds] = useState(defaultNumRounds);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSelectNumPlaintexts = (value) => {
        const numPlaintexts = parseInt(value);
        setNumPlaintexts(numPlaintexts);
    }
    const handleSelectNumRounds = (value) => {
        const numRounds = parseInt(value);
        setNumRounds(numRounds);
    }
    useEffect(() => {
        setPlaintexts(Array(numPlaintexts).fill(defaultPlaintext));
    }, [numPlaintexts]);
    const handleInputChange = (e) => {
        const newPlaintexts = [...plaintexts];
        const i = parseInt(e.target.id);
        newPlaintexts[i - 1] = e.target.value;
        setPlaintexts(newPlaintexts);
    }
    const renderInputFields = (numPlaintexts) => {
        const inputFields = [];
        for (let i = 0; i < numPlaintexts / 4; i++) {
            inputFields.push(
                <Space key={`sp-${i}`}style={{ width: 'calc(50% - 20px)'}} direction="vertical">
                    <Input data-testid={`input-${(i * 4) + 1}`} id={`${(i * 4) + 1}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 1 - 1]} />
                    <Input data-testid={`input-${(i * 4) + 2}`} id={`${(i * 4) + 2}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 2 - 1]} />
                    <Input data-testid={`input-${(i * 4) + 3}`} id={`${(i * 4) + 3}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 3 - 1]} />
                    <Input data-testid={`input-${(i * 4) + 4}`} id={`${(i * 4) + 4}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 4 - 1]} />
                </Space>
            )
        }
        return inputFields
    }
    const handleSubmit = async () => {
        setErrorMessage(null);
        setResponseData(null);
        setIsLoading(true);
        console.log('numPlaintexts:', numPlaintexts, 'plaintexts:', plaintexts, 'numRounds:', numRounds);
        const data = {
            numPlaintexts,
            plaintexts,
            numRounds
        }
        try {
            const response = await postData(SPECK_ENDPOINT, data);
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
            <h1>Speck 32/64</h1>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <br></br>
                <p>Input <Select data-testid='numPlaintexts' defaultValue={defaultNumPlaintexts} onChange={handleSelectNumPlaintexts} style={{ width: '60px'}} options={numPlaintextsOptions}/> <b>32-bit</b> plaintexts for <Select data-testid='numRounds' defaultValue={defaultNumRounds} onChange={handleSelectNumRounds} style={{ width: '60px'}} options={numRoundsOptions}/> rounds of Speck: </p>
                <br></br>
                {renderInputFields(numPlaintexts)}
                <br></br>
                <br></br>
                <br></br>
                <Button data-testid='submitSpeck' onClick={handleSubmit} style={{width: 'calc(20% - 20px)', minWidth:'200px'}} type="primary" block>Run Encryption</Button>
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