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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620024b8380380620024b883398181016040528101906200003791906200022d565b60018081905550620000536000801b336200009c60201b60201c565b620000857f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa846200009c60201b60201c565b8160028190555080600381905550505050620002f5565b620000ae82826200018d60201b60201c565b6200018957600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506200012e620001f760201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b6000815190506200021081620002c1565b92915050565b6000815190506200022781620002db565b92915050565b6000806000606084860312156200024357600080fd5b60006200025386828701620001ff565b9350506020620002668682870162000216565b9250506040620002798682870162000216565b9150509250925092565b6000620002908262000297565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b620002cc8162000283565b8114620002d857600080fd5b50565b620002e681620002b7565b8114620002f257600080fd5b50565b6121b380620003056000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636a18ff7a11610097578063d0e30db011610066578063d0e30db0146102f9578063d547741f14610317578063dc07aeb214610333578063ee44a35a1461036357610100565b80636a18ff7a1461024b57806385f4498b1461027b57806391d14854146102ab578063a217fddf146102db57610100565b80632f2ff15d116100d35780632f2ff15d146101b357806336568abe146101cf5780634e35c56d146101eb578063509484d51461021b57610100565b806301ffc9a714610105578063125fdbbc14610135578063248a9ca3146101535780632739327814610183575b600080fd5b61011f600480360381019061011a9190611638565b610381565b60405161012c9190611a5a565b60405180910390f35b61013d6103fb565b60405161014a9190611a75565b60405180910390f35b61016d600480360381019061016891906115d3565b61041f565b60405161017a9190611a75565b60405180910390f35b61019d600480360381019061019891906116e0565b61043e565b6040516101aa9190611a5a565b60405180910390f35b6101cd60048036038101906101c891906115fc565b610683565b005b6101e960048036038101906101e491906115fc565b6106a4565b005b610205600480360381019061020091906115aa565b610727565b6040516102129190611a5a565b60405180910390f35b610235600480360381019061023091906115aa565b6107a5565b6040516102429190611a5a565b60405180910390f35b61026560048036038101906102609190611732565b610829565b6040516102729190611a5a565b60405180910390f35b610295600480360381019061029091906115aa565b6109f7565b6040516102a29190611a5a565b60405180910390f35b6102c560048036038101906102c091906115fc565b610a71565b6040516102d29190611a5a565b60405180910390f35b6102e3610adb565b6040516102f09190611a75565b60405180910390f35b610301610ae2565b60405161030e9190611a5a565b60405180910390f35b610331600480360381019061032c91906115fc565b610bde565b005b61034d60048036038101906103489190611661565b610bff565b60405161035a9190611b72565b60405180910390f35b61036b610d31565b6040516103789190611a75565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103f457506103f382610d55565b5b9050919050565b7f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6981565b6000806000838152602001908152602001600020600101549050919050565b600080600660008481526020019081526020016000209050600081600001541161049d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049490611af2565b60405180910390fd5b80600001544210156104e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104db90611b32565b60405180910390fd5b600254816002015482600101546104fb9190611c84565b101561053c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053390611ad2565b60405180910390fd5b60008160000181905550600081600201548260010154119050801515847f0ccdb367a4080de4edb91ed885d4ae83bfffc3d18c5e854f5eb54c1e61d891e284600101548560020154604051610592929190611b8d565b60405180910390a380156106785760008260030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000846004016040516105f091906119be565b60006040518083038185875af1925050503d806000811461062d576040519150601f19603f3d011682016040523d82523d6000602084013e610632565b606091505b5050905080610676576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066d90611b12565b60405180910390fd5b505b600192505050919050565b61068c8261041f565b61069581610dbf565b61069f8383610dd3565b505050565b6106ac610eb3565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610719576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071090611b52565b60405180910390fd5b6107238282610ebb565b5050565b60007f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6961075381610dbf565b6000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001915050919050565b60008060001b6107b481610dbf565b6107de7f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a6984610dd3565b82600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001915050919050565b6000806006600086815260200190815260200160002090506000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008260000154116108cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c290611af2565b60405180910390fd5b848160020160008881526020019081526020016000205482600001546108f19190611d34565b1015610932576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092990611ad2565b60405180910390fd5b8315610984578482600101600082825461094c9190611c84565b925050819055508481600201600088815260200190815260200160002060008282546109789190611c84565b925050819055506109cc565b848260020160008282546109989190611c84565b925050819055508481600201600088815260200190815260200160002060008282546109c49190611c84565b925050819055505b8160000154816001015410156109ea57816000015481600101819055505b6001925050509392505050565b60007f1bcc0f4c3fad314e585165815f94ecca9b96690a26d6417d7876448a9a867a69610a2381610dbf565b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154421015915050919050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639ab24eb0336040518263ffffffff1660e01b8152600401610b3f9190611a0f565b602060405180830381600087803b158015610b5957600080fd5b505af1158015610b6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b919190611709565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506001905090565b610be78261041f565b610bf081610dbf565b610bfa8383610ebb565b505050565b60007f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa610c2b81610dbf565b600060066000600454815260200190815260200160002090506004547fec52604d01e140f3399ab5b3d380de6a94b1e77d78dc3fb61e432f9dafb0735d8686604051610c78929190611a2a565b60405180910390a260046000815480929190610c9390611eb5565b919050555060035442610ca69190611c84565b8160000181905550848160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085816004019080519060200190610d09929190611333565b5083816005019080519060200190610d229291906113b9565b50600454925050509392505050565b7f5778c2f7d924e55986d549d645f53119b71708389fc2011260c8a657c569fcaa81565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610dd081610dcb610eb3565b610f9c565b50565b610ddd8282610a71565b610eaf57600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610e54610eb3565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600033905090565b610ec58282610a71565b15610f9857600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610f3d610eb3565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b610fa68282610a71565b61103557610fcb8173ffffffffffffffffffffffffffffffffffffffff166014611039565b610fd98360001c6020611039565b604051602001610fea9291906119d5565b6040516020818303038152906040526040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102c9190611a90565b60405180910390fd5b5050565b60606000600283600261104c9190611cda565b6110569190611c84565b67ffffffffffffffff811115611095577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156110c75781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611125577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106111af577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026111ef9190611cda565b6111f99190611c84565b90505b60018111156112e5577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110611261577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b82828151811061129e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806112de90611e28565b90506111fc565b5060008414611329576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132090611ab2565b60405180910390fd5b8091505092915050565b82805461133f90611e52565b90600052602060002090601f01602090048101928261136157600085556113a8565b82601f1061137a57805160ff19168380011785556113a8565b828001600101855582156113a8579182015b828111156113a757825182559160200191906001019061138c565b5b5090506113b5919061143f565b5090565b8280546113c590611e52565b90600052602060002090601f0160209004810192826113e7576000855561142e565b82601f1061140057805160ff191683800117855561142e565b8280016001018555821561142e579182015b8281111561142d578251825591602001919060010190611412565b5b50905061143b919061143f565b5090565b5b80821115611458576000816000905550600101611440565b5090565b600061146f61146a84611bdb565b611bb6565b90508281526020810184848401111561148757600080fd5b611492848285611de6565b509392505050565b60006114ad6114a884611c0c565b611bb6565b9050828152602081018484840111156114c557600080fd5b6114d0848285611de6565b509392505050565b6000813590506114e78161210a565b92915050565b6000813590506114fc81612121565b92915050565b60008135905061151181612138565b92915050565b6000813590506115268161214f565b92915050565b600082601f83011261153d57600080fd5b813561154d84826020860161145c565b91505092915050565b600082601f83011261156757600080fd5b813561157784826020860161149a565b91505092915050565b60008135905061158f81612166565b92915050565b6000815190506115a481612166565b92915050565b6000602082840312156115bc57600080fd5b60006115ca848285016114d8565b91505092915050565b6000602082840312156115e557600080fd5b60006115f384828501611502565b91505092915050565b6000806040838503121561160f57600080fd5b600061161d85828601611502565b925050602061162e858286016114d8565b9150509250929050565b60006020828403121561164a57600080fd5b600061165884828501611517565b91505092915050565b60008060006060848603121561167657600080fd5b600084013567ffffffffffffffff81111561169057600080fd5b61169c8682870161152c565b93505060206116ad868287016114d8565b925050604084013567ffffffffffffffff8111156116ca57600080fd5b6116d686828701611556565b9150509250925092565b6000602082840312156116f257600080fd5b600061170084828501611580565b91505092915050565b60006020828403121561171b57600080fd5b600061172984828501611595565b91505092915050565b60008060006060848603121561174757600080fd5b600061175586828701611580565b935050602061176686828701611580565b9250506040611777868287016114ed565b9150509250925092565b61178a81611d68565b82525050565b61179981611d7a565b82525050565b6117a881611d86565b82525050565b600081546117bb81611e52565b6117c58186611c5d565b945060018216600081146117e057600181146117f157611824565b60ff19831686528186019350611824565b6117fa85611c3d565b60005b8381101561181c578154818901526001820191506020810190506117fd565b838801955050505b50505092915050565b600061183882611c52565b6118428185611c68565b9350611852818560208601611df5565b61185b81611f8b565b840191505092915050565b600061187182611c52565b61187b8185611c79565b935061188b818560208601611df5565b80840191505092915050565b60006118a4602083611c68565b91506118af82611f9c565b602082019050919050565b60006118c7601083611c68565b91506118d282611fc5565b602082019050919050565b60006118ea601683611c68565b91506118f582611fee565b602082019050919050565b600061190d601783611c79565b915061191882612017565b601782019050919050565b6000611930601083611c68565b915061193b82612040565b602082019050919050565b6000611953601483611c68565b915061195e82612069565b602082019050919050565b6000611976601183611c79565b915061198182612092565b601182019050919050565b6000611999602f83611c68565b91506119a4826120bb565b604082019050919050565b6119b881611ddc565b82525050565b60006119ca82846117ae565b915081905092915050565b60006119e082611900565b91506119ec8285611866565b91506119f782611969565b9150611a038284611866565b91508190509392505050565b6000602082019050611a246000830184611781565b92915050565b6000604082019050611a3f6000830185611781565b8181036020830152611a51818461182d565b90509392505050565b6000602082019050611a6f6000830184611790565b92915050565b6000602082019050611a8a600083018461179f565b92915050565b60006020820190508181036000830152611aaa818461182d565b905092915050565b60006020820190508181036000830152611acb81611897565b9050919050565b60006020820190508181036000830152611aeb816118ba565b9050919050565b60006020820190508181036000830152611b0b816118dd565b9050919050565b60006020820190508181036000830152611b2b81611923565b9050919050565b60006020820190508181036000830152611b4b81611946565b9050919050565b60006020820190508181036000830152611b6b8161198c565b9050919050565b6000602082019050611b8760008301846119af565b92915050565b6000604082019050611ba260008301856119af565b611baf60208301846119af565b9392505050565b6000611bc0611bd1565b9050611bcc8282611e84565b919050565b6000604051905090565b600067ffffffffffffffff821115611bf657611bf5611f5c565b5b611bff82611f8b565b9050602081019050919050565b600067ffffffffffffffff821115611c2757611c26611f5c565b5b611c3082611f8b565b9050602081019050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000611c8f82611ddc565b9150611c9a83611ddc565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611ccf57611cce611efe565b5b828201905092915050565b6000611ce582611ddc565b9150611cf083611ddc565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611d2957611d28611efe565b5b828202905092915050565b6000611d3f82611ddc565b9150611d4a83611ddc565b925082821015611d5d57611d5c611efe565b5b828203905092915050565b6000611d7382611dbc565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611e13578082015181840152602081019050611df8565b83811115611e22576000848401525b50505050565b6000611e3382611ddc565b91506000821415611e4757611e46611efe565b5b600182039050919050565b60006002820490506001821680611e6a57607f821691505b60208210811415611e7e57611e7d611f2d565b5b50919050565b611e8d82611f8b565b810181811067ffffffffffffffff82111715611eac57611eab611f5c565b5b80604052505050565b6000611ec082611ddc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611ef357611ef2611efe565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f4e6f7420656e6f75676820766f74657300000000000000000000000000000000600082015250565b7f50726f706f73616c206973206e6f742061637469766500000000000000000000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f4f7065726174696f6e206661696c656400000000000000000000000000000000600082015250565b7f46696e6973682074696d65206e6f7420636f6d65000000000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b61211381611d68565b811461211e57600080fd5b50565b61212a81611d7a565b811461213557600080fd5b50565b61214181611d86565b811461214c57600080fd5b50565b61215881611d90565b811461216357600080fd5b50565b61216f81611ddc565b811461217a57600080fd5b5056fea264697066735822122094fa383718a61c790735fc822ce4c669c517a99d27f9e73a72ba53c72e72d9c864736f6c63430008040033";

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
