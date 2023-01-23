/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ETHr, ETHrInterface } from "../../contracts/ETHr";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "param",
        type: "string",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allowTime",
        type: "uint256",
      },
    ],
    name: "InvalidExecution",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "allowTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "RecoveryWaitTimeUpdateRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "RecoveryWaitTimeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accounts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
    inputs: [],
    name: "defaultAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
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
    name: "executions",
    outputs: [
      {
        internalType: "uint256",
        name: "allowTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInactive",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
    name: "inheritAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    name: "modifyTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "recovery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "recoveryWaitTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "requestChangeRecoveryWaitTime",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "setDefaultAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "setRecoveryWaitTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeLock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600054600a80546001600160a01b0319166001600160a01b03909216919091179055603c600b553480156200003857600080fd5b5060405162001b5038038062001b508339810160408190526200005b91620001a9565b818181816200006a3362000094565b6004620000788382620002a2565b506005620000878282620002a2565b505050505050506200036e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200010c57600080fd5b81516001600160401b0380821115620001295762000129620000e4565b604051601f8301601f19908116603f01168101908282118183101715620001545762000154620000e4565b816040528381526020925086838588010111156200017157600080fd5b600091505b8382101562000195578582018301518183018401529082019062000176565b600093810190920192909252949350505050565b60008060408385031215620001bd57600080fd5b82516001600160401b0380821115620001d557600080fd5b620001e386838701620000fa565b93506020850151915080821115620001fa57600080fd5b506200020985828601620000fa565b9150509250929050565b600181811c908216806200022857607f821691505b6020821081036200024957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200029d57600081815260208120601f850160051c81016020861015620002785750805b601f850160051c820191505b81811015620002995782815560010162000284565b5050505b505050565b81516001600160401b03811115620002be57620002be620000e4565b620002d681620002cf845462000213565b846200024f565b602080601f8311600181146200030e5760008415620002f55750858301515b600019600386901b1c1916600185901b17855562000299565b600085815260208120601f198616915b828110156200033f578886015182559484019460019091019084016200031e565b50858210156200035e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6117d2806200037e6000396000f3fe6080604052600436106101b75760003560e01c80637ee63f63116100ec578063be3b268b1161008a578063dd62ed3e11610064578063dd62ed3e146104e2578063f2a40db814610502578063f2fde38b14610522578063f76c92291461054257600080fd5b8063be3b268b146104a5578063d085835a146104c5578063d0e30db0146104da57600080fd5b80639fa8fc80116100c65780639fa8fc801461040f578063a457c2d71461042f578063a9059cbb1461044f578063b93a70f41461046f57600080fd5b80637ee63f63146103bc5780638da5cb5b146103dc57806395d89b41146103fa57600080fd5b80632e299821116101595780635c101693116101335780635c101693146103235780636b60dd241461035b57806370a0823114610371578063715018a6146103a757600080fd5b80632e299821146102c7578063313ce567146102e7578063395093511461030357600080fd5b806318160ddd1161019557806318160ddd146102395780631fc0eefd1461025857806323b872dd146102855780632e1a7d4d146102a557600080fd5b806306fdde03146101bc5780630928b7c4146101e7578063095ea7b314610209575b600080fd5b3480156101c857600080fd5b506101d161058b565b6040516101de9190611487565b60405180910390f35b3480156101f357600080fd5b506101fc61061d565b6040516101de91906114d5565b34801561021557600080fd5b50610229610224366004611539565b610793565b60405190151581526020016101de565b34801561024557600080fd5b506003545b6040519081526020016101de565b34801561026457600080fd5b5061024a610273366004611563565b60066020526000908152604090205481565b34801561029157600080fd5b506102296102a0366004611585565b6107ad565b3480156102b157600080fd5b506102c56102c03660046115c1565b6107d1565b005b3480156102d357600080fd5b506102c56102e23660046115da565b61080c565b3480156102f357600080fd5b50604051601281526020016101de565b34801561030f57600080fd5b5061022961031e366004611539565b6108d5565b34801561032f57600080fd5b50600a54610343906001600160a01b031681565b6040516001600160a01b0390911681526020016101de565b34801561036757600080fd5b5061024a600b5481565b34801561037d57600080fd5b5061024a61038c366004611563565b6001600160a01b031660009081526001602052604090205490565b3480156103b357600080fd5b506102c56108f7565b3480156103c857600080fd5b5061024a6103d73660046115c1565b61090b565b3480156103e857600080fd5b506000546001600160a01b0316610343565b34801561040657600080fd5b506101d16109c6565b34801561041b57600080fd5b506102c561042a366004611563565b6109d5565b34801561043b57600080fd5b5061022961044a366004611539565b610a50565b34801561045b57600080fd5b5061022961046a366004611539565b610acb565b34801561047b57600080fd5b5061034361048a366004611563565b6007602052600090815260409020546001600160a01b031681565b3480156104b157600080fd5b506102c56104c0366004611612565b610ad9565b3480156104d157600080fd5b5061024a600a81565b6102c5610c86565b3480156104ee57600080fd5b5061024a6104fd3660046116d7565b610c90565b34801561050e57600080fd5b5061034361051d3660046115c1565b610cbb565b34801561052e57600080fd5b506102c561053d366004611563565b610ce5565b34801561054e57600080fd5b5061057661055d3660046115c1565b6008602052600090815260409020805460019091015482565b604080519283526020830191909152016101de565b60606004805461059a9061170a565b80601f01602080910402602001604051908101604052809291908181526020018280546105c69061170a565b80156106135780601f106105e857610100808354040283529160200191610613565b820191906000526020600020905b8154815290600101906020018083116105f657829003601f168201915b5050505050905090565b6009805460408051602080840282018101909252828152606093429360009383018282801561067557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610657575b5050505050905060008151905060008167ffffffffffffffff81111561069d5761069d6115fc565b6040519080825280602002602001820160405280156106c6578160200160208202803683370190505b5090506000805b8381101561078857600b54600660008784815181106106ee576106ee611744565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020546107219190611770565b8610156107785784818151811061073a5761073a611744565b602002602001015183838151811061075457610754611744565b6001600160a01b039092166020928302919091019091015261077582611783565b91505b61078181611783565b90506106cd565b509095945050505050565b6000336107a1818585610d5e565b60019150505b92915050565b6000336107bb858285610e82565b6107c6858585610efc565b506001949350505050565b6107db33826110b8565b604051339082156108fc029083906000818181858888f19350505050158015610808573d6000803e3d6000fd5b5050565b6108146111ff565b600082815260086020526040902054603c82101561084d5760405163da0f9de960e01b8152600481018390526024015b60405180910390fd5b821580610858575080155b806108635750428110155b156108845760405163da0f9de960e01b815260048101829052602401610844565b600b8290556040518281527fbac9ff0742ef5e0d6987fc322084d774ba780bd33d6de70491ff4116329e9ede9060200160405180910390a15050600090815260086020526040812081815560010155565b6000336107a18185856108e88383610c90565b6108f29190611770565b610d5e565b6108ff6111ff565b6109096000611259565b565b60006109156111ff565b6000610959604080514260208083019190915243828401819052416060840152406080808401919091528351808403909101815260a0909201909252805191012090565b90506000610968600a42611770565b6000838152600860209081526040918290206001810188905583905581518781529081018390529192507f241ff46f8170d89e8fd1620f073c28a6289902c576cf6d59dbd55e2446f1ce91910160405180910390a15090505b919050565b60606005805461059a9061170a565b6109dd6111ff565b6001600160a01b038116610a2e5760408051630961777760e41b815260048082019290925260448101919091526330b2323960e11b60648201526001600160a01b0382166024820152608401610844565b600a80546001600160a01b0319166001600160a01b0392909216919091179055565b60003381610a5e8286610c90565b905083811015610abe5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610844565b6107c68286868403610d5e565b6000336107a1818585610efc565b4260005b8251811015610c8157600060066000858481518110610afe57610afe611744565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020549050600060076000868581518110610b4157610b41611744565b6020908102919091018101516001600160a01b0390811683529082019290925260400160002054600b5491169150610b799083611770565b841015610c6e5760006001600160a01b03821615610b975781610ba4565b600a546001600160a01b03165b9050610be28161046a888781518110610bbf57610bbf611744565b60200260200101516001600160a01b031660009081526001602052604090205490565b5060066000878681518110610bf957610bf9611744565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000905560076000878681518110610c3b57610c3b611744565b6020908102919091018101516001600160a01b0316825281019190915260400160002080546001600160a01b0319169055505b505080610c7a90611783565b9050610add565b505050565b61090933346112a9565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b60098181548110610ccb57600080fd5b6000918252602090912001546001600160a01b0316905081565b610ced6111ff565b6001600160a01b038116610d525760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610844565b610d5b81611259565b50565b6001600160a01b038316610dc05760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610844565b6001600160a01b038216610e215760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610844565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610e8e8484610c90565b90506000198114610ef65781811015610ee95760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610844565b610ef68484848403610d5e565b50505050565b6001600160a01b038316610f605760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610844565b6001600160a01b038216610fc25760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610844565b610fcd83838361137e565b6001600160a01b038316600090815260016020526040902054818110156110455760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610844565b6001600160a01b0380851660008181526001602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906110a59086815260200190565b60405180910390a3610ef684848461140f565b6001600160a01b0382166111185760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610844565b6111248260008361137e565b6001600160a01b038216600090815260016020526040902054818110156111985760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610844565b6001600160a01b03831660008181526001602090815260408083208686039055600380548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610c818360008461140f565b6000546001600160a01b031633146109095760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610844565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0382166112ff5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610844565b61130b6000838361137e565b806003600082825461131d9190611770565b90915550506001600160a01b0382166000818152600160209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36108086000838361140f565b6001600160a01b0382166000908152600160205260409020541580156113ac57506001600160a01b03821615155b80156113b85750600081115b15610c8157600980546001810182556000919091527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0180546001600160a01b0384166001600160a01b0319909116179055505050565b426001600160a01b038416158015906114285750600082115b15611449576001600160a01b03841660009081526006602052604090208190555b6001600160a01b038316158015906114615750600082115b15610ef6576001600160a01b038316600090815260066020526040902081905550505050565b600060208083528351808285015260005b818110156114b457858101830151858201604001528201611498565b506000604082860101526040601f19601f8301168501019250505092915050565b6020808252825182820181905260009190848201906040850190845b818110156115165783516001600160a01b0316835292840192918401916001016114f1565b50909695505050505050565b80356001600160a01b03811681146109c157600080fd5b6000806040838503121561154c57600080fd5b61155583611522565b946020939093013593505050565b60006020828403121561157557600080fd5b61157e82611522565b9392505050565b60008060006060848603121561159a57600080fd5b6115a384611522565b92506115b160208501611522565b9150604084013590509250925092565b6000602082840312156115d357600080fd5b5035919050565b600080604083850312156115ed57600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561162557600080fd5b823567ffffffffffffffff8082111561163d57600080fd5b818501915085601f83011261165157600080fd5b813581811115611663576116636115fc565b8060051b604051601f19603f83011681018181108582111715611688576116886115fc565b6040529182528482019250838101850191888311156116a657600080fd5b938501935b828510156116cb576116bc85611522565b845293850193928501926116ab565b98975050505050505050565b600080604083850312156116ea57600080fd5b6116f383611522565b915061170160208401611522565b90509250929050565b600181811c9082168061171e57607f821691505b60208210810361173e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156107a7576107a761175a565b6000600182016117955761179561175a565b506001019056fea26469706673582212204497c66c7eae4047792ccc24b5a67d418cea18d4fd5ee9da20bd549cb583b2e264736f6c63430008100033";

type ETHrConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ETHrConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ETHr__factory extends ContractFactory {
  constructor(...args: ETHrConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ETHr> {
    return super.deploy(name, symbol, overrides || {}) as Promise<ETHr>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): ETHr {
    return super.attach(address) as ETHr;
  }
  override connect(signer: Signer): ETHr__factory {
    return super.connect(signer) as ETHr__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ETHrInterface {
    return new utils.Interface(_abi) as ETHrInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ETHr {
    return new Contract(address, _abi, signerOrProvider) as ETHr;
  }
}