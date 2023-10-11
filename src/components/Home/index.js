import React from 'react';
import { Divider } from 'antd';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Divider />
            <p>Welcome to the CryptoAI project! This page will walk you through the process of using the neural distinguisher, a cutting-edge tool designed to classify sets of ciphertexts as either "random" or "related." Please follow these steps carefully to get the most out of the CryptoAI project.</p>
            {/* <hr style={{borderWidth: '0.5px', borderColor: '#fafafa', margin: '40px 0'}}></hr> */}
            <Divider />
            <section>
                <h2>Using the Neural Distinguisher</h2>
                <p>Follow these steps to use the neural distinguisher:
                    <ol>
                        <li><b>Input ciphertexts</b>: The neural distinguisher accepts four ciphertexts from the user. Enter these ciphertexts into the provided input fields.</li>
                        <li><b>Format</b>: Make sure that the ciphertexts are in the form of hexadecimal values, with the format "0x0000." Each ciphertext should consist of exactly 6 characters following the "0x" prefix.</li>
                        <li><b>Submit</b>: Click the "Submit" button to initiate the analysis.</li>
                        <li><b>Wait for results</b>: The neural distinguisher will process your input, and you will receive an output shortly.</li>
                    </ol>
                </p>
            </section>
            {/* <hr style={{borderWidth: '0.5px', borderColor: '#fafafa', margin: '40px 0'}}></hr> */}
            <Divider />
            <section>
                <h2>Interpreting the Output</h2>
                <p>The neural distinguisher's output will fall into one of two categories:</p>
                <ul>
                    <li><b>Random</b>: This means that the neural distinguisher has classified your ciphertexts as random and unrelated.</li>
                    <li><b>Related</b>: This indicates that the neural distinguisher has classified your ciphertexts as related or exhibiting some form of structure.</li>
                </ul>
            </section>
        </div>
    )
}

export default Home;