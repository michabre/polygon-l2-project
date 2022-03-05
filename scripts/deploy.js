const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("wave");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // let txn = await domainContract.register("darksynth",  {value: hre.ethers.utils.parseEther('0.1')});
    // await txn.wait();
    // console.log("Minted domain darksynth.wave");
  
    // txn = await domainContract.setRecord("darksynth", "Am I a darksynth or just chillin??");
    // await txn.wait();
    // console.log("Set record for darksynth.wave");
  
    // const address = await domainContract.getAddress("darksynth");
    // console.log("Owner of domain darksynth:", address);
  
    // const balance = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();