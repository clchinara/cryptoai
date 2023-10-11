import React from 'react';
import { Space, Select, Input, Divider, Button } from 'antd';

const { useState, useEffect } = React;

const defaultNumPlaintexts = 4;
const defaultSpeckRounds = 5
const defaultPlaintext = '00000000';

const numPlaintextsOptions = [4, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const speckRoundsOptions = [5, 6, 7, 8].map((value) => ({
    value: value,
    label: `${value}`
}))

const Demo = () => {
    const [numPlaintexts, setNumPlaintexts] = useState(defaultNumPlaintexts);
    const [plaintexts, setPlaintexts] = useState(Array(defaultNumPlaintexts).fill('00000000'));
    const [speckRounds, setSpeckRounds] = useState(defaultSpeckRounds);
    const handleSelectNumPlaintexts = (value) => {
        const numPlaintexts = parseInt(value);
        setNumPlaintexts(numPlaintexts);
    }
    const handleSelectSpeckRounds = (value) => {
        const speckRounds = parseInt(value);
        setSpeckRounds(speckRounds);
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
                    <Input id={`${(i * 4) + 1}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 1 - 1]} />
                    <Input id={`${(i * 4) + 2}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 2 - 1]} />
                    <Input id={`${(i * 4) + 3}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 3 - 1]} />
                    <Input id={`${(i * 4) + 4}`} onChange={handleInputChange} style={{ width: 'calc(100% - 20px)' }} addonBefore="0x" defaultValue={defaultPlaintext} value={plaintexts[(i * 4) + 4 - 1]} />
                </Space>
            )
        }
        return inputFields
    }
    const handleSubmit = () => {
        console.log('numPlaintexts:', numPlaintexts, 'plaintexts:', plaintexts, 'speckRounds:', speckRounds);
    }
    return (
        <div>
            <h1>Demo</h1>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <br></br>
                <p>Input <Select defaultValue={defaultNumPlaintexts} onChange={handleSelectNumPlaintexts} style={{ width: '60px'}} options={numPlaintextsOptions}/> <b>32-bit</b> plaintexts for <Select defaultValue={defaultSpeckRounds} onChange={handleSelectSpeckRounds} style={{ width: '60px'}} options={speckRoundsOptions}/> rounds of Speck: </p>
                <br></br>
                {renderInputFields(numPlaintexts)}
                <br></br>
                <br></br>
                <br></br>
                <Button onClick={handleSubmit} style={{width: 'calc(20% - 20px)', minWidth:'200px'}} type="primary" block>Run ND</Button>
            </div>
        </div>
    )
}

export default Demo;