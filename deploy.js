const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'hip leader primary hard memory science balance safe index magnet mad gym',
    'https://rinkeby.infura.io/v3/7053d2510f0d4c799a6eb856c67d5dbc'
);

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [
        "Name",
        "01-02-1990",
        "a@a.com",
        "8888888888",
        "house, street address, locality",
        "777777",
        "a district",
        "a city",
        "a state",
      ],
    })
    .send({ from: accounts[0], gas: "3439254" });
    console.log('Contract deployed to', result.options.address);
};
deploy();
