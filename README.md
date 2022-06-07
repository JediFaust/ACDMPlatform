<h1 align="center"><b>ACDM Platform</b></h3>

<div align="left">


[![Language](https://img.shields.io/badge/language-solidity-orange.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"><h2 align="center"><b> Platform for trade and sale tokens with Staking and DAO
    </h2></b><br> 
</p>

## 📝 Table of Contents

- [EtherScan Link](#etherscan)
- [Installing](#install)
- [Deploy & Test Scripts](#scripts)
- [HardHat Tasks](#tasks)

## 🚀 Link on EtherScan <a name = "etherscan"></a>
XXXToken on Etherscan: <br>
https://rinkeby.etherscan.io/address/0xE6F6509434f176cB746f9D86bD7D212094Cfb66a#code<br>
ACDMToken on Etherscan: <br>
https://rinkeby.etherscan.io/address/0x73a37a923Ed7FE42F45Ff6A5F8A7104Aa2129aCf#code<br>
XXXStake on Etherscan: <br>
https://rinkeby.etherscan.io/address/0x5C1484aB1b347ca253a6C8697ed936741edE3831#code<br>
XXXDAO on Etherscan: <br>
https://rinkeby.etherscan.io/address/0xAcd7D1CA4cd6758b331d2e981A637df25d0400e2#code<br>
ACDMPlatform on Etherscan: <br>
https://rinkeby.etherscan.io/address/0x44D3394E146541C7a5F64a55b391c667288F9B43#code<br>




## 🚀 Installing <a name = "install"></a>
- Set validator address on scripts/deploy.ts file
- Deploy four contracts running on console:
```shell
node scripts/deploy.ts
```
- Copy address of deployed contracts and paste to .env file






## 🎈 Deploy & Test Scripts <a name = "scripts"></a>

```shell
node scripts/deploy.js
node scripts/deployXXXToken.ts
npx hardhat test  --network hardhat
```


## 💡 HardHat Tasks <a name = "tasks"></a>


```shell
npx hardhat register
npx hardhat register-with-referer --address
npx hardhat start-sale-round
npx hardhat buy --value
npx hardhat start-trade-round
npx hardhat add-order --price --amount
npx hardhat remove-order --id
npx hardhat redeem-order --id --amount --value
  
```
```

