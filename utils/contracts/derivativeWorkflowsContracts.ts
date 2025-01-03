export const derivativeWorkflowsContractAddress = "0xa8815CEB96857FFb8f5F8ce920b1Ae6D70254C7B" as const;

export const derivativeWorkflowsContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accessController",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "coreMetadataModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "ipAssetRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licensingModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "pilTemplate",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "royaltyModule",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "authority",
                "type": "address"
            }
        ],
        "name": "AccessManagedInvalidAuthority",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "delay",
                "type": "uint32"
            }
        ],
        "name": "AccessManagedRequiredDelay",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "AccessManagedUnauthorized",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "AddressInsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "actualTokenOwner",
                "type": "address"
            }
        ],
        "name": "DerivativeWorkflows__CallerAndNotTokenOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "DerivativeWorkflows__EmptyLicenseTokens",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "DerivativeWorkflows__ZeroAddressParam",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "ERC1967InvalidImplementation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ERC1967NonPayable",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidInitialization",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UUPSUnauthorizedCallContext",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "slot",
                "type": "bytes32"
            }
        ],
        "name": "UUPSUnsupportedProxiableUUID",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Workflow__CallerNotAuthorizedToMint",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "authority",
                "type": "address"
            }
        ],
        "name": "AuthorityUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ACCESS_CONTROLLER",
        "outputs": [
            {
                "internalType": "contract IAccessController",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "CORE_METADATA_MODULE",
        "outputs": [
            {
                "internalType": "contract ICoreMetadataModule",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IP_ASSET_REGISTRY",
        "outputs": [
            {
                "internalType": "contract IIPAssetRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LICENSE_REGISTRY",
        "outputs": [
            {
                "internalType": "contract ILicenseRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LICENSE_TOKEN",
        "outputs": [
            {
                "internalType": "contract ILicenseToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LICENSING_MODULE",
        "outputs": [
            {
                "internalType": "contract ILicensingModule",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PIL_TEMPLATE",
        "outputs": [
            {
                "internalType": "contract IPILicenseTemplate",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ROYALTY_MODULE",
        "outputs": [
            {
                "internalType": "contract IRoyaltyModule",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "UPGRADE_INTERFACE_VERSION",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "authority",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accessManager",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isConsumingScheduledOp",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spgNftContract",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "address[]",
                        "name": "parentIpIds",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address",
                        "name": "licenseTemplate",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "licenseTermsIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "bytes",
                        "name": "royaltyContext",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.MakeDerivative",
                "name": "derivData",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ipMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ipMetadataHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "nftMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "nftMetadataHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct WorkflowStructs.IPMetadata",
                "name": "ipMetadata",
                "type": "tuple"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "mintAndRegisterIpAndMakeDerivative",
        "outputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spgNftContract",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "licenseTokenIds",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "royaltyContext",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ipMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ipMetadataHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "nftMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "nftMetadataHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct WorkflowStructs.IPMetadata",
                "name": "ipMetadata",
                "type": "tuple"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "mintAndRegisterIpAndMakeDerivativeWithLicenseTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes[]",
                "name": "data",
                "type": "bytes[]"
            }
        ],
        "name": "multicall",
        "outputs": [
            {
                "internalType": "bytes[]",
                "name": "results",
                "type": "bytes[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "address[]",
                        "name": "parentIpIds",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address",
                        "name": "licenseTemplate",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "licenseTermsIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "bytes",
                        "name": "royaltyContext",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.MakeDerivative",
                "name": "derivData",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ipMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ipMetadataHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "nftMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "nftMetadataHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct WorkflowStructs.IPMetadata",
                "name": "ipMetadata",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.SignatureData",
                "name": "sigMetadata",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.SignatureData",
                "name": "sigRegister",
                "type": "tuple"
            }
        ],
        "name": "registerIpAndMakeDerivative",
        "outputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "licenseTokenIds",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "royaltyContext",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ipMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ipMetadataHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string",
                        "name": "nftMetadataURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "nftMetadataHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct WorkflowStructs.IPMetadata",
                "name": "ipMetadata",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.SignatureData",
                "name": "sigMetadata",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct WorkflowStructs.SignatureData",
                "name": "sigRegister",
                "type": "tuple"
            }
        ],
        "name": "registerIpAndMakeDerivativeWithLicenseTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAuthority",
                "type": "address"
            }
        ],
        "name": "setAuthority",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newNftContractBeacon",
                "type": "address"
            }
        ],
        "name": "setNftContractBeacon",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
] as const;