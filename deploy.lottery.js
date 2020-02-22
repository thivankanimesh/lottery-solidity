const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.lottery');

const provider = new HDWalletProvider(
    'chalk cost solve oyster autumn fiscal cry travel give remind stuff brief',
    'https://rinkeby.infura.io/v3/a5dbc0bc9d554e61bf04f50fac2d560e'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x'+bytecode})
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface);
    console.log('Contract deployed to', result.options.address);
};

deploy();