export const licensingModuleContractAddress = "0x5a7D9Fa17DE09350F481A53B470D798c1c1aabae" as const;

export const licensingModuleContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accessController",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "ipAccountRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "moduleRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "royaltyModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "disputeModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseToken",
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
                "name": "ipAccount",
                "type": "address"
            }
        ],
        "name": "AccessControlled__NotIpAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "AccessControlled__ZeroAddress",
        "type": "error"
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
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
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
        "name": "LicensingModule__DisputedIpId",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            }
        ],
        "name": "LicensingModule__InvalidLicenseTermsId",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "hook",
                "type": "address"
            }
        ],
        "name": "LicensingModule__InvalidLicensingHook",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "licensorIpId",
                "type": "address"
            }
        ],
        "name": "LicensingModule__LicenseDenyMintLicenseToken",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "childIpId",
                "type": "address"
            }
        ],
        "name": "LicensingModule__LicenseNotCompatibleForDerivative",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ipLength",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsLength",
                "type": "uint256"
            }
        ],
        "name": "LicensingModule__LicenseTermsLengthMismatch",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "childIpId",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "licenseTokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "LicensingModule__LicenseTokenNotCompatibleForDerivative",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__LicensorIpNotRegistered",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__MintAmountZero",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__NoLicenseToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__NoParentIp",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ReceiverZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroAccessManager",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroDisputeModule",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroLicenseRegistry",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroLicenseToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroModuleRegistry",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LicensingModule__ZeroRoyaltyModule",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitializing",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
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
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "childIpId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "licenseTokenIds",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "parentIpIds",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "licenseTermsIds",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            }
        ],
        "name": "DerivativeRegistered",
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
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            }
        ],
        "name": "LicenseTermsAttached",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "licensorIpId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startLicenseTokenId",
                "type": "uint256"
            }
        ],
        "name": "LicenseTokensMinted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
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
        "name": "DISPUTE_MODULE",
        "outputs": [
            {
                "internalType": "contract IDisputeModule",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IP_ACCOUNT_REGISTRY",
        "outputs": [
            {
                "internalType": "contract IIPAccountRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LICENSE_NFT",
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
        "name": "MODULE_REGISTRY",
        "outputs": [
            {
                "internalType": "contract IModuleRegistry",
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
                "internalType": "contract RoyaltyModule",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "accessManager",
                "type": "address"
            }
        ],
        "name": "__ProtocolPausable_init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            }
        ],
        "name": "attachLicenseTerms",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "licensorIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "royaltyContext",
                "type": "bytes"
            }
        ],
        "name": "mintLicenseTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "startLicenseTokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
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
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "licensorIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "royaltyContext",
                "type": "bytes"
            }
        ],
        "name": "predictMintingLicenseFee",
        "outputs": [
            {
                "internalType": "address",
                "name": "currencyToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
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
                "name": "childIpId",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "parentIpIds",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "licenseTermsIds",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "royaltyContext",
                "type": "bytes"
            }
        ],
        "name": "registerDerivative",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "childIpId",
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
            }
        ],
        "name": "registerDerivativeWithLicenseTokens",
        "outputs": [],
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
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseTemplate",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "licenseTermsId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isSet",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "mintingFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "licensingHook",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "hookData",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct Licensing.LicensingConfig",
                "name": "licensingConfig",
                "type": "tuple"
            }
        ],
        "name": "setLicensingConfig",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
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