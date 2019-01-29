const Ganache = require("ganache-core");
const Web3 = require("web3");
const compile = require("./compile");

const main = async () => {
  // 1. Compile contract artifact
  const { SimpleStorage } = await compile("SimpleStorage.sol");

  // 2. Spawn Ganache test blockchain
  const provider = Ganache.provider();
  console.log(provider.constructor.name)
  
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  // 3. Create initial contract instance
  const instance = new web3.eth.Contract(SimpleStorage.abi);
  console.log(4)

  // 4. Deploy contract and get new deployed instance
  const deployedInstance = await instance
    .deploy({ data: SimpleStorage.evm.bytecode.object })
    .send({ from: accounts[0], gas: 150000 });

  web3.eth.subscribe(() => console.log("new block found!"));

  await contractInstance.methods.set(1).send({ from: accounts[0] });
  await contractInstance.methods.set(2).send({ from: accounts[0] });
  await contractInstance.methods.set(3).send({ from: accounts[0] });
};

main();
