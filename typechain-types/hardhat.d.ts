/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC20R",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20R__factory>;
    getContractFactory(
<<<<<<< HEAD
      name: "ETHr",
=======
      name: "NFortress_v1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFortress_v1__factory>;
    getContractFactory(
      name: "NFortress",
>>>>>>> 5b80d6791d95baa478f51ab21b585fb212a5824d
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ETHr__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC20R",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20R>;
    getContractAt(
<<<<<<< HEAD
      name: "ETHr",
=======
      name: "NFortress_v1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFortress_v1>;
    getContractAt(
      name: "NFortress",
>>>>>>> 5b80d6791d95baa478f51ab21b585fb212a5824d
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ETHr>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
