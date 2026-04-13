const hre = require("hardhat");

async function main() {
  const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const code = await hre.ethers.provider.getCode(address);
  console.log(`Code at ${address}: ${code === '0x' ? 'EMPTY' : 'FOUND (' + code.length + ' bytes)'}`);
  
  if (code !== '0x') {
    const kyc = await hre.ethers.getContractAt("DecentralizedKYC", address);
    try {
      const gov = await kyc.government();
      console.log(`Government address: ${gov}`);
    } catch (e) {
      console.log(`Error calling government(): ${e.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
