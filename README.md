# cryptoai
An MVP dashboard to showcase results from my FYP, which was acknowledged as one of the top five computer science projects in S2-2023 at Monash University Malaysia. 

## Running the client

First, change the current working directory:
```bash
cd client
```

Make sure you have NPM installed. Then, install the dependencies:
```bash
npm install
```

To start the client, run the following:
```bash
npm start
```
It should run on port 3000. 

## Running the server

First, change the current working directory:
```bash
cd server
```

Create a Conda environment from the given `environment.yml`, then activate it:
```bash
conda env create -f environment.yml
conda activate deep-speck
```

To start the server, run the following:
```bash
flask run
```
It should run on port 5000.
