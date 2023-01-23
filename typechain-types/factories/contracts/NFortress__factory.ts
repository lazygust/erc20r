/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { NFortress, NFortressInterface } from "../../contracts/NFortress";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "variable",
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
        internalType: "string",
        name: "variable",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "InvalidValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "ServiceExpired",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    inputs: [
      {
        internalType: "address",
        name: "nftAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "balanceOfERC1155",
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
        name: "nftAddr",
        type: "address",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "balanceOfERC721",
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
        name: "proxy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "bindAddress",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oldProxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "newProxy",
        type: "address",
      },
    ],
    name: "changeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "discountBulk",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "discountData",
    outputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "feeDiscount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        name: "addr",
        type: "address",
      },
    ],
    name: "getExpire",
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
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "getFee",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "getPromotion",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "nftAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "ownerOfERC721",
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
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
    ],
    name: "removePromotion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "renewService",
    outputs: [],
    stateMutability: "payable",
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
        name: "_discont",
        type: "uint256",
      },
    ],
    name: "setBulkDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feeDiscount",
        type: "uint256",
      },
    ],
    name: "setPromotion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBound",
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
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612301806100206000396000f3fe6080604052600436106101405760003560e01c80636d137450116100b6578063ddca3f431161006f578063ddca3f4314610377578063e5b848241461038d578063ecddde4c146103ad578063efe08a7d146103cd578063f2fde38b146103ed578063fe59ac8d1461040d57600080fd5b80636d137450146102b5578063715018a6146102d55780638129fc1c146102ea5780638da5cb5b146102ff578063ae22c57d14610327578063ccf8690f1461034757600080fd5b80634edeb834116101085780634edeb8341461020257806351cff8d91461022257806351e3cc721461024257806363de54e81461026257806369fe0e2d146102755780636ba702971461029557600080fd5b806303f85f28146101455780631d65d159146101895780633abacfa6146101ad5780633b5673b5146101cf5780633eeb3108146101e2575b600080fd5b34801561015157600080fd5b50610165610160366004611e23565b610423565b604080516001600160a01b0390931683526020830191909152015b60405180910390f35b34801561019557600080fd5b5061019f60695481565b604051908152602001610180565b3480156101b957600080fd5b506101cd6101c8366004611e23565b61045b565b005b6101cd6101dd366004611e23565b610468565b3480156101ee57600080fd5b5061019f6101fd366004611e93565b61062a565b34801561020e57600080fd5b5061019f61021d366004611f16565b61084c565b34801561022e57600080fd5b506101cd61023d366004611f42565b610955565b34801561024e57600080fd5b5061019f61025d366004611f42565b610996565b6101cd610270366004611f16565b610b10565b34801561028157600080fd5b506101cd610290366004611e23565b610cc5565b3480156102a157600080fd5b506101cd6102b0366004611f16565b610cd2565b3480156102c157600080fd5b5061019f6102d0366004611f42565b610d6f565b3480156102e157600080fd5b506101cd610e41565b3480156102f657600080fd5b506101cd610e55565b34801561030b57600080fd5b506033546040516001600160a01b039091168152602001610180565b34801561033357600080fd5b50610165610342366004611f42565b610f72565b34801561035357600080fd5b50610367610362366004611f66565b611084565b6040519015158152602001610180565b34801561038357600080fd5b5061019f606a5481565b34801561039957600080fd5b5061019f6103a8366004611f66565b611201565b3480156103b957600080fd5b506101cd6103c8366004611f42565b611433565b3480156103d957600080fd5b506101cd6103e8366004611ff2565b61160d565b3480156103f957600080fd5b506101cd610408366004611f42565b61182e565b34801561041957600080fd5b5061019f60685481565b6067818154811061043357600080fd5b6000918252602090912060029091020180546001909101546001600160a01b03909116915082565b6104636118a4565b606855565b60018110806104775750600a81115b156104c15780604051632c648cf160e01b81526004016104b891906040808252600490820152633cb2b0b960e11b6060820152602081019190915260800190565b60405180910390fd5b336000818152606660209081526040808320546065835292819020815180830190925280546001600160a01b039081168084526001909201549383019390935291909216929015801561051c57506001600160a01b03831615155b1561055e5750506001600160a01b0380821660009081526065602090815260409182902082518084019093528054909316825260019092015491810191909152815b81516001600160a01b03166105885733604051630961777760e41b81526004016104b8919061202b565b83610593338661084c565b023410156105d85760408051632c648cf160e01b8152600481019190915260096044820152686d73672e76616c756560b81b60648201523460248201526084016104b8565b602082015142906000828211156105f857506301e22d8086028101610603565b506301e22d80860282015b6001600160a01b039093166000908152606560205260409020600101929092555050505050565b60006001600160a01b0386166106555785604051630961777760e41b81526004016104b89190612060565b600085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525093945061069d9250849150879050866118fe565b6040516370a0823160e01b81526001600160a01b0380831660048301529192506000918a16906370a0823190602401602060405180830381865afa1580156106e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070d9190612092565b6001600160a01b038084166000908152606660209081526040808320546065909252909120549293508116911681156107b7576040516370a0823160e01b81526001600160a01b0383811660048301528c16906370a0823190602401602060405180830381865afa158015610786573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107aa9190612092565b6107b490846120c1565b92505b6001600160a01b0381161561083d576040516370a0823160e01b81526001600160a01b0382811660048301528c16906370a0823190602401602060405180830381865afa15801561080c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108309190612092565b61083a90846120c1565b92505b50909998505050505050505050565b606a54606854600091908261086086610996565b90506002851180156108725750600585105b156108a457606461088381846120ea565b61088d90856120fe565b610897919061211d565b6108a19084612131565b92505b6004851180156108b45750600a85105b156108f1576064806108c6818561211d565b6108d091906120ea565b6108da90856120fe565b6108e4919061211d565b6108ee9084612131565b92505b60098511156109295760646109086127108461211d565b61091290856120fe565b61091c919061211d565b6109269084612131565b92505b606461093582856120fe565b61093f919061211d565b6109499084612131565b93505050505b92915050565b61095d6118a4565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015610992573d6000803e3d6000fd5b5050565b60008060006067805480602002602001604051908101604052809291908181526020016000905b82821015610a05576000848152602090819020604080518082019091526002850290910180546001600160a01b031682526001908101548284015290835290920191016109bd565b50505050905060005b8151811015610b07576000828281518110610a2b57610a2b612144565b6020908102919091010151516040516370a0823160e01b81526001600160a01b038881166004830152909116906370a0823190602401602060405180830381865afa158015610a7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa29190612092565b9050600081118015610ad0575083838381518110610ac257610ac2612144565b602002602001015160200151115b15610af657828281518110610ae757610ae7612144565b60200260200101516020015193505b50610b008161215a565b9050610a0e565b50909392505050565b6001600160a01b0382161580610b2e57506001600160a01b03821633145b15610b755760408051630961777760e41b81526004810191909152600560448201526470726f787960d81b60648201526001600160a01b03831660248201526084016104b8565b6001811080610b845750600a81115b15610bc55780604051632c648cf160e01b81526004016104b891906040808252600490820152633cb2b0b960e11b6060820152602081019190915260800190565b336000908152606660205260409020546001600160a01b031615610bfe5733604051630961777760e41b81526004016104b8919061202b565b80610c09338361084c565b02341015610c4e5760408051632c648cf160e01b8152600481019190915260096044820152686d73672e76616c756560b81b60648201523460248201526084016104b8565b604080518082018252338082526301e22d8093909302420160208083019182526001600160a01b03958616600081815260658352858120945185546001600160a01b031990811691909916178555925160019485015594825260669052919091208054909316909117909155606980549091019055565b610ccd6118a4565b606a55565b610cda6118a4565b604080518082019091526001600160a01b039283168152602081019182526067805460018101825560009190915290517f9787eeb91fe3101235e4a76063c7023ecb40f923f97916639c598592fa30d6ae600290920291820180546001600160a01b0319169190941617909255517f9787eeb91fe3101235e4a76063c7023ecb40f923f97916639c598592fa30d6af90910155565b6001600160a01b03808216600081815260656020908152604080832081518083018352815487168152600190910154818401529383526066909152812054825191939081169116158015610dcb57506001600160a01b03811615155b15610e0c576001600160a01b038082166000908152606560209081526040918290208251808401909352805490931682526001909201549181019190915291505b81516001600160a01b0316610e365783604051630961777760e41b81526004016104b89190612173565b506020015192915050565b610e496118a4565b610e536000611955565b565b600054610100900460ff1615808015610e755750600054600160ff909116105b80610e8f5750303b158015610e8f575060005460ff166001145b610ef25760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016104b8565b6000805460ff191660011790558015610f15576000805461ff0019166101001790555b610f1d6119a7565b6000606a5562024ddd6068558015610f6f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b6001600160a01b03808216600081815260656020908152604080832081518083018352815487168152600190910154818401529383526066909152812054825191938493849384939192918216911615610fd3578151935060019250611022565b6001600160a01b03811615611022576001600160a01b03808216600090815260656020908152604091829020825180840190935280549093168252600190920154918101919091529093509050825b6001600160a01b03841661104b5786604051630961777760e41b81526004016104b89190612173565b4282602001511015611078578160200151604051630bcf26d760e21b81526004016104b891815260200190565b50919590945092505050565b60006001600160a01b0387166110af5786604051630961777760e41b81526004016104b89190612060565b600085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509394506110f79250849150879050866118fe565b6040516331a9108f60e11b8152600481018a90529091506000906001600160a01b038b1690636352211e90602401602060405180830381865afa158015611142573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116691906121a2565b6001600160a01b0380841660008181526066602090815260408083205460659092529091205493945082851690911492908216911681156111c15782806111be5750816001600160a01b0316846001600160a01b0316145b92505b6001600160a01b038116156111f05782806111ed5750806001600160a01b0316846001600160a01b0316145b92505b50909b9a5050505050505050505050565b60006001600160a01b03871661122c5786604051630961777760e41b81526004016104b89190612060565b600085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509394506112749250849150879050866118fe565b604051627eeac760e11b81526001600160a01b038083166004830152602482018b90529192506000918b169062fdd58e90604401602060405180830381865afa1580156112c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e99190612092565b6001600160a01b0380841660009081526066602090815260408083205460659092529091205492935081169116811561139857604051627eeac760e11b81526001600160a01b038381166004830152602482018d90528d169062fdd58e90604401602060405180830381865afa158015611367573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061138b9190612092565b61139590846120c1565b92505b6001600160a01b0381161561142357604051627eeac760e11b81526001600160a01b038281166004830152602482018d90528d169062fdd58e90604401602060405180830381865afa1580156113f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114169190612092565b61142090846120c1565b92505b50909a9950505050505050505050565b61143b6118a4565b60006067805480602002602001604051908101604052809291908181526020016000905b828210156114a7576000848152602090819020604080518082019091526002850290910180546001600160a01b0316825260019081015482840152908352909201910161145f565b5050505090506000600182516114bd9190612131565b905060005b81811161160757836001600160a01b03168382815181106114e5576114e5612144565b6020026020010151600001516001600160a01b0316036115f75782828151811061151157611511612144565b602002602001015183828151811061152b5761152b612144565b60200260200101516067838154811061154657611546612144565b906000526020600020906002020160006067868154811061156957611569612144565b6000918252602091829020855160029092020180546001600160a01b039283166001600160a01b0319918216178255958301516001918201558651855492169190951617835593909301519101555060678054806115c9576115c96121bf565b60008281526020812060026000199093019283020180546001600160a01b0319168155600101559055611607565b6116008161215a565b90506114c2565b50505050565b6001600160a01b038216158061163e5750336000908152606660205260409020546001600160a01b03838116911614155b156116885760408051630961777760e41b8152600481019190915260086044820152676f6c6450726f787960c01b60648201526001600160a01b03831660248201526084016104b8565b6001600160a01b03811615806116a657506001600160a01b03811633145b806116c25750816001600160a01b0316816001600160a01b0316145b806116e657506001600160a01b038181166000908152606560205260409020541615155b8061170a57506001600160a01b038181166000908152606660205260409020541615155b156117545760408051630961777760e41b8152600481019190915260086044820152676e657750726f787960c01b60648201526001600160a01b03821660248201526084016104b8565b6001600160a01b03808316600090815260656020908152604091829020825180840190935280549093168252600190920154918101829052904211156117b5578060200151604051630bcf26d760e21b81526004016104b891815260200190565b604080518082018252338082526020938401518483019081526001600160a01b039586166000818152606580885286822095518654908a166001600160a01b0319918216178755935160019687015593815260668752858120805484169092179091559690951686529092528320805490921682550155565b6118366118a4565b6001600160a01b03811661189b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104b8565b610f6f81611955565b6033546001600160a01b03163314610e535760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104b8565b60008061190a856119d6565b905061194c8185858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611a1192505050565b95945050505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff166119ce5760405162461bcd60e51b81526004016104b8906121d5565b610e53611a35565b60006119e28251611a65565b826040516020016119f4929190612244565b604051602081830303815290604052805190602001209050919050565b6000806000611a208585611af8565b91509150611a2d81611b3d565b509392505050565b600054610100900460ff16611a5c5760405162461bcd60e51b81526004016104b8906121d5565b610e5333611955565b60606000611a7283611c87565b600101905060008167ffffffffffffffff811115611a9257611a9261229f565b6040519080825280601f01601f191660200182016040528015611abc576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084611ac657509392505050565b6000808251604103611b2e5760208301516040840151606085015160001a611b2287828585611d5f565b94509450505050611b36565b506000905060025b9250929050565b6000816004811115611b5157611b516122b5565b03611b595750565b6001816004811115611b6d57611b6d6122b5565b03611bba5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016104b8565b6002816004811115611bce57611bce6122b5565b03611c1b5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016104b8565b6003816004811115611c2f57611c2f6122b5565b03610f6f5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016104b8565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310611cc65772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611cf2576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611d1057662386f26fc10000830492506010015b6305f5e1008310611d28576305f5e100830492506008015b6127108310611d3c57612710830492506004015b60648310611d4e576064830492506002015b600a831061094f5760010192915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611d965750600090506003611e1a565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611dea573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611e1357600060019250925050611e1a565b9150600090505b94509492505050565b600060208284031215611e3557600080fd5b5035919050565b6001600160a01b0381168114610f6f57600080fd5b60008083601f840112611e6357600080fd5b50813567ffffffffffffffff811115611e7b57600080fd5b602083019150836020828501011115611b3657600080fd5b600080600080600060608688031215611eab57600080fd5b8535611eb681611e3c565b9450602086013567ffffffffffffffff80821115611ed357600080fd5b611edf89838a01611e51565b90965094506040880135915080821115611ef857600080fd5b50611f0588828901611e51565b969995985093965092949392505050565b60008060408385031215611f2957600080fd5b8235611f3481611e3c565b946020939093013593505050565b600060208284031215611f5457600080fd5b8135611f5f81611e3c565b9392505050565b60008060008060008060808789031215611f7f57600080fd5b8635611f8a81611e3c565b955060208701359450604087013567ffffffffffffffff80821115611fae57600080fd5b611fba8a838b01611e51565b90965094506060890135915080821115611fd357600080fd5b50611fe089828a01611e51565b979a9699509497509295939492505050565b6000806040838503121561200557600080fd5b823561201081611e3c565b9150602083013561202081611e3c565b809150509250929050565b6040808252600a908201526936b9b39739b2b73232b960b11b60608201526001600160a01b0391909116602082015260800190565b60408082526007908201526637333a20b2323960c91b60608201526001600160a01b0391909116602082015260800190565b6000602082840312156120a457600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561094f5761094f6120ab565b634e487b7160e01b600052601260045260246000fd5b6000826120f9576120f96120d4565b500690565b6000816000190483118215151615612118576121186120ab565b500290565b60008261212c5761212c6120d4565b500490565b8181038181111561094f5761094f6120ab565b634e487b7160e01b600052603260045260246000fd5b60006001820161216c5761216c6120ab565b5060010190565b60408082526004908201526330b2323960e11b60608201526001600160a01b0391909116602082015260800190565b6000602082840312156121b457600080fd5b8151611f5f81611e3c565b634e487b7160e01b600052603160045260246000fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60005b8381101561223b578181015183820152602001612223565b50506000910152565b7f19457468657265756d205369676e6564204d6573736167653a0a00000000000081526000835161227c81601a850160208801612220565b83519083019061229381601a840160208801612220565b01601a01949350505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea26469706673582212207d70474c86d93868403ab68ed2147e053b8009fa7f3ad84d03ae393ac340df9664736f6c63430008100033";

type NFortressConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFortressConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFortress__factory extends ContractFactory {
  constructor(...args: NFortressConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFortress> {
    return super.deploy(overrides || {}) as Promise<NFortress>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NFortress {
    return super.attach(address) as NFortress;
  }
  override connect(signer: Signer): NFortress__factory {
    return super.connect(signer) as NFortress__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFortressInterface {
    return new utils.Interface(_abi) as NFortressInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFortress {
    return new Contract(address, _abi, signerOrProvider) as NFortress;
  }
}