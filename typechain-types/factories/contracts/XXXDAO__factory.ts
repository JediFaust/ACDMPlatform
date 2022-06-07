/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XXXDAO, XXXDAOInterface } from "../../contracts/XXXDAO";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "chairPerson",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minimumQuorum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "debatingPeriodDuration",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "called",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "forVotes",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "againstVotes",
        type: "uint256",
      },
    ],
    name: "FinishedProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "NewProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "CHAIRMAN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "addProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "staker",
        type: "address",
      },
    ],
    name: "canUnstake",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "emptyDeposit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalID",
        type: "uint256",
      },
    ],
    name: "finishProposal",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "uint256",
        name: "finishTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesFor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votesAgainst",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "stake",
        type: "address",
      },
    ],
    name: "setStakeContract",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isVoteFor",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620027c0380380620027c083398181016040528101906200003791906200022d565b60018081905550620000536000801b336200009c60201b60201c565b620000857f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa846200009c60201b60201c565b8160028190555080600381905550505050620002f5565b620000ae82826200018d60201b60201c565b6200018957600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506200012e620001f760201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6000815190506200021081620002c1565b92915050565b6000815190506200022781620002db565b92915050565b6000806000606084860312156200024357600080fd5b60006200025386828701620001ff565b9350506020620002668682870162000216565b9250506040620002798682870162000216565b9150509250925092565b6000620002908262000297565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b620002cc8162000283565b8114620002d857600080fd5b50565b620002e681620002b7565b8114620002f257600080fd5b50565b6124bb80620003056000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80636a18ff7a116100a2578063a3ec138d11610071578063a3ec138d14610344578063d0e30db014610375578063d547741f14610393578063dc07aeb2146103af578063ee44a35a146103df57610116565b80636a18ff7a1461029657806385f4498b146102c657806391d14854146102f6578063a217fddf1461032657610116565b806327393278116100e957806327393278146101ce5780632f2ff15d146101fe57806336568abe1461021a5780634e35c56d14610236578063509484d51461026657610116565b8063013cf08b1461011b57806301ffc9a714610150578063125fdbbc14610180578063248a9ca31461019e575b600080fd5b610135600480360381019061013091906118ec565b6103fd565b60405161014796959493929190611e3e565b60405180910390f35b61016a60048036038101906101659190611844565b610569565b6040516101779190611cc2565b60405180910390f35b6101886105e3565b6040516101959190611cdd565b60405180910390f35b6101b860048036038101906101b391906117df565b610607565b6040516101c59190611cdd565b60405180910390f35b6101e860048036038101906101e391906118ec565b610626565b6040516101f59190611cc2565b60405180910390f35b61021860048036038101906102139190611808565b61086b565b005b610234600480360381019061022f9190611808565b61088c565b005b610250600480360381019061024b91906117b6565b61090f565b60405161025d9190611cc2565b60405180910390f35b610280600480360381019061027b91906117b6565b61098d565b60405161028d9190611cc2565b60405180910390f35b6102b060048036038101906102ab919061193e565b610a11565b6040516102bd9190611cc2565b60405180910390f35b6102e060048036038101906102db91906117b6565b610bdf565b6040516102ed9190611cc2565b60405180910390f35b610310600480360381019061030b9190611808565b610c59565b60405161031d9190611cc2565b60405180910390f35b61032e610cc3565b60405161033b9190611cdd565b60405180910390f35b61035e600480360381019061035991906117b6565b610cca565b60405161036c929190611e15565b60405180910390f35b61037d610cee565b60405161038a9190611cc2565b60405180910390f35b6103ad60048036038101906103a89190611808565b610dea565b005b6103c960048036038101906103c4919061186d565b610e0b565b6040516103d69190611dfa565b60405180910390f35b6103e7610f3d565b6040516103f49190611cdd565b60405180910390f35b60066020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600401805461045890612131565b80601f016020809104026020016040519081016040528092919081815260200182805461048490612131565b80156104d15780601f106104a6576101008083540402835291602001916104d1565b820191906000526020600020905b8154815290600101906020018083116104b457829003601f168201915b5050505050908060050180546104e690612131565b80601f016020809104026020016040519081016040528092919081815260200182805461051290612131565b801561055f5780601f106105345761010080835404028352916020019161055f565b820191906000526020600020905b81548152906001019060200180831161054257829003601f168201915b5050505050905086565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105dc57506105db82610f61565b5b9050919050565b7f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6981565b6000806000838152602001908152602001600020600101549050919050565b6000806006600084815260200190815260200160002090506000816000015411610685576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067c90611d7a565b60405180910390fd5b80600001544210156106cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c390611dba565b60405180910390fd5b600254816002015482600101546106e39190611f97565b1015610724576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071b90611d5a565b60405180910390fd5b60008160000181905550600081600201548260010154119050801515847f0ccdb367a4080de4edb91ed885d4ae83bfffc3d18c5e854f5eb54c1e61d891e28460010154856002015460405161077a929190611e15565b60405180910390a380156108605760008260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000846004016040516107d89190611c26565b60006040518083038185875af1925050503d8060008114610815576040519150601f19603f3d011682016040523d82523d6000602084013e61081a565b606091505b505090508061085e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085590611d9a565b60405180910390fd5b505b600192505050919050565b61087482610607565b61087d81610fcb565b6108878383610fdf565b505050565b6108946110bf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610901576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f890611dda565b60405180910390fd5b61090b82826110c7565b5050565b60007f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6961093b81610fcb565b6000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001915050919050565b60008060001b61099c81610fcb565b6109c67f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6984610fdf565b82600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001915050919050565b6000806006600086815260200190815260200160002090506000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000826000015411610ab3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aaa90611d7a565b60405180910390fd5b80600001548160020160008881526020019081526020016000205486610ad99190611f97565b1115610b1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1190611d3a565b60405180910390fd5b8315610b6c5784826001016000828254610b349190611f97565b92505081905550848160020160008881526020019081526020016000206000828254610b609190611f97565b92505081905550610bb4565b84826002016000828254610b809190611f97565b92505081905550848160020160008881526020019081526020016000206000828254610bac9190611f97565b925050819055505b816000015481600101541015610bd257816000015481600101819055505b6001925050509392505050565b60007f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a69610c0b81610fcb565b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154421015915050919050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b60076020528060005260406000206000915090508060000154908060010154905082565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639ab24eb0336040518263ffffffff1660e01b8152600401610d4b9190611c77565b602060405180830381600087803b158015610d6557600080fd5b505af1158015610d79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9d9190611915565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001905090565b610df382610607565b610dfc81610fcb565b610e0683836110c7565b505050565b60007f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa610e3781610fcb565b600060066000600454815260200190815260200160002090506004547fec52604d01e140f3399ab5b3d380de6a94b1e77d78dc3fb61e432f9dafb0735d8686604051610e84929190611c92565b60405180910390a260046000815480929190610e9f90612194565b919050555060035442610eb29190611f97565b8160000181905550848160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085816004019080519060200190610f1592919061153f565b5083816005019080519060200190610f2e9291906115c5565b50600454925050509392505050565b7f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa81565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610fdc81610fd76110bf565b6111a8565b50565b610fe98282610c59565b6110bb57600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506110606110bf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600033905090565b6110d18282610c59565b156111a457600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506111496110bf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b6111b28282610c59565b611241576111d78173ffffffffffffffffffffffffffffffffffffffff166014611245565b6111e58360001c6020611245565b6040516020016111f6929190611c3d565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112389190611cf8565b60405180910390fd5b5050565b6060600060028360026112589190611fed565b6112629190611f97565b67ffffffffffffffff8111156112a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156112d35781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611331577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106113bb577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026113fb9190611fed565b6114059190611f97565b90505b60018111156114f1577f3031323334353637383961626364656600000000000000000000000000000000600f86166010811061146d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b8282815181106114aa577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806114ea90612107565b9050611408565b5060008414611535576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161152c90611d1a565b60405180910390fd5b8091505092915050565b82805461154b90612131565b90600052602060002090601f01602090048101928261156d57600085556115b4565b82601f1061158657805160ff19168380011785556115b4565b828001600101855582156115b4579182015b828111156115b3578251825591602001919060010190611598565b5b5090506115c1919061164b565b5090565b8280546115d190612131565b90600052602060002090601f0160209004810192826115f3576000855561163a565b82601f1061160c57805160ff191683800117855561163a565b8280016001018555821561163a579182015b8281111561163957825182559160200191906001019061161e565b5b509050611647919061164b565b5090565b5b8082111561166457600081600090555060010161164c565b5090565b600061167b61167684611ed2565b611ead565b90508281526020810184848401111561169357600080fd5b61169e8482856120c5565b509392505050565b60006116b96116b484611f03565b611ead565b9050828152602081018484840111156116d157600080fd5b6116dc8482856120c5565b509392505050565b6000813590506116f381612412565b92915050565b60008135905061170881612429565b92915050565b60008135905061171d81612440565b92915050565b60008135905061173281612457565b92915050565b600082601f83011261174957600080fd5b8135611759848260208601611668565b91505092915050565b600082601f83011261177357600080fd5b81356117838482602086016116a6565b91505092915050565b60008135905061179b8161246e565b92915050565b6000815190506117b08161246e565b92915050565b6000602082840312156117c857600080fd5b60006117d6848285016116e4565b91505092915050565b6000602082840312156117f157600080fd5b60006117ff8482850161170e565b91505092915050565b6000806040838503121561181b57600080fd5b60006118298582860161170e565b925050602061183a858286016116e4565b9150509250929050565b60006020828403121561185657600080fd5b600061186484828501611723565b91505092915050565b60008060006060848603121561188257600080fd5b600084013567ffffffffffffffff81111561189c57600080fd5b6118a886828701611738565b93505060206118b9868287016116e4565b925050604084013567ffffffffffffffff8111156118d657600080fd5b6118e286828701611762565b9150509250925092565b6000602082840312156118fe57600080fd5b600061190c8482850161178c565b91505092915050565b60006020828403121561192757600080fd5b6000611935848285016117a1565b91505092915050565b60008060006060848603121561195357600080fd5b60006119618682870161178c565b93505060206119728682870161178c565b9250506040611983868287016116f9565b9150509250925092565b61199681612047565b82525050565b6119a581612059565b82525050565b6119b481612065565b82525050565b60006119c582611f49565b6119cf8185611f5f565b93506119df8185602086016120d4565b6119e88161226a565b840191505092915050565b60008154611a0081612131565b611a0a8186611f70565b94506001821660008114611a255760018114611a3657611a69565b60ff19831686528186019350611a69565b611a3f85611f34565b60005b83811015611a6157815481890152600182019150602081019050611a42565b838801955050505b50505092915050565b6000611a7d82611f54565b611a878185611f7b565b9350611a978185602086016120d4565b611aa08161226a565b840191505092915050565b6000611ab682611f54565b611ac08185611f8c565b9350611ad08185602086016120d4565b80840191505092915050565b6000611ae9602083611f7b565b9150611af48261227b565b602082019050919050565b6000611b0c601083611f7b565b9150611b17826122a4565b602082019050919050565b6000611b2f601283611f7b565b9150611b3a826122cd565b602082019050919050565b6000611b52601683611f7b565b9150611b5d826122f6565b602082019050919050565b6000611b75601783611f8c565b9150611b808261231f565b601782019050919050565b6000611b98601083611f7b565b9150611ba382612348565b602082019050919050565b6000611bbb601483611f7b565b9150611bc682612371565b602082019050919050565b6000611bde601183611f8c565b9150611be98261239a565b601182019050919050565b6000611c01602f83611f7b565b9150611c0c826123c3565b604082019050919050565b611c20816120bb565b82525050565b6000611c3282846119f3565b915081905092915050565b6000611c4882611b68565b9150611c548285611aab565b9150611c5f82611bd1565b9150611c6b8284611aab565b91508190509392505050565b6000602082019050611c8c600083018461198d565b92915050565b6000604082019050611ca7600083018561198d565b8181036020830152611cb98184611a72565b90509392505050565b6000602082019050611cd7600083018461199c565b92915050565b6000602082019050611cf260008301846119ab565b92915050565b60006020820190508181036000830152611d128184611a72565b905092915050565b60006020820190508181036000830152611d3381611adc565b9050919050565b60006020820190508181036000830152611d5381611aff565b9050919050565b60006020820190508181036000830152611d7381611b22565b9050919050565b60006020820190508181036000830152611d9381611b45565b9050919050565b60006020820190508181036000830152611db381611b8b565b9050919050565b60006020820190508181036000830152611dd381611bae565b9050919050565b60006020820190508181036000830152611df381611bf4565b9050919050565b6000602082019050611e0f6000830184611c17565b92915050565b6000604082019050611e2a6000830185611c17565b611e376020830184611c17565b9392505050565b600060c082019050611e536000830189611c17565b611e606020830188611c17565b611e6d6040830187611c17565b611e7a606083018661198d565b8181036080830152611e8c81856119ba565b905081810360a0830152611ea08184611a72565b9050979650505050505050565b6000611eb7611ec8565b9050611ec38282612163565b919050565b6000604051905090565b600067ffffffffffffffff821115611eed57611eec61223b565b5b611ef68261226a565b9050602081019050919050565b600067ffffffffffffffff821115611f1e57611f1d61223b565b5b611f278261226a565b9050602081019050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000611fa2826120bb565b9150611fad836120bb565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611fe257611fe16121dd565b5b828201905092915050565b6000611ff8826120bb565b9150612003836120bb565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561203c5761203b6121dd565b5b828202905092915050565b60006120528261209b565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156120f25780820151818401526020810190506120d7565b83811115612101576000848401525b50505050565b6000612112826120bb565b91506000821415612126576121256121dd565b5b600182039050919050565b6000600282049050600182168061214957607f821691505b6020821081141561215d5761215c61220c565b5b50919050565b61216c8261226a565b810181811067ffffffffffffffff8211171561218b5761218a61223b565b5b80604052505050565b600061219f826120bb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156121d2576121d16121dd565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f4e6f7420656e6f75676820766f74657300000000000000000000000000000000600082015250565b7f51756f72756d206e6f7420726561636865640000000000000000000000000000600082015250565b7f50726f706f73616c206973206e6f742061637469766500000000000000000000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f4f7065726174696f6e206661696c656400000000000000000000000000000000600082015250565b7f46696e6973682074696d65206e6f7420636f6d65000000000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b61241b81612047565b811461242657600080fd5b50565b61243281612059565b811461243d57600080fd5b50565b61244981612065565b811461245457600080fd5b50565b6124608161206f565b811461246b57600080fd5b50565b612477816120bb565b811461248257600080fd5b5056fea264697066735822122082fcc40cd906a58d91fe164a75332884c7337fc5e7eb45f687e33757c0ddd0e564736f6c63430008040033";

type XXXDAOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XXXDAOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XXXDAO__factory extends ContractFactory {
  constructor(...args: XXXDAOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    chairPerson: string,
    minimumQuorum: BigNumberish,
    debatingPeriodDuration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XXXDAO> {
    return super.deploy(
      chairPerson,
      minimumQuorum,
      debatingPeriodDuration,
      overrides || {}
    ) as Promise<XXXDAO>;
  }
  override getDeployTransaction(
    chairPerson: string,
    minimumQuorum: BigNumberish,
    debatingPeriodDuration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      chairPerson,
      minimumQuorum,
      debatingPeriodDuration,
      overrides || {}
    );
  }
  override attach(address: string): XXXDAO {
    return super.attach(address) as XXXDAO;
  }
  override connect(signer: Signer): XXXDAO__factory {
    return super.connect(signer) as XXXDAO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XXXDAOInterface {
    return new utils.Interface(_abi) as XXXDAOInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): XXXDAO {
    return new Contract(address, _abi, signerOrProvider) as XXXDAO;
  }
}
