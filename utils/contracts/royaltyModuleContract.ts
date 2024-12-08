export const royaltyModuleContractAddress = "0xEa6eD700b11DfF703665CCAF55887ca56134Ae3B" as const;

export const royaltyModuleContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "licensingModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "disputeModule",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "licenseRegistry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "ipAssetRegistry",
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
        "name": "RoyaltyModule__AboveAccumulatedRoyaltyPoliciesLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__AboveAncestorsLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__AboveMaxPercent",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__AboveParentLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__IpIsTagged",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__LastPositionNotAbleToMintLicense",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__NoParentsOnLinking",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__NotAllowedCaller",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__NotWhitelistedOrRegisteredRoyaltyPolicy",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__NotWhitelistedRoyaltyToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__PolicyAlreadyWhitelistedOrRegistered",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__UnlinkableToParents",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroAccessManager",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroAccumulatedRoyaltyPoliciesLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroDisputeModule",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroIpAssetRegistry",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroLicenseRegistry",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroLicensingModule",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroMaxAncestors",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroMaxParents",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroParentIpId",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroReceiverVault",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroRoyaltyPolicy",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroRoyaltyToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyModule__ZeroTreasury",
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
        "name": "VaultController__ZeroIpRoyaltyVaultBeacon",
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
                "internalType": "address",
                "name": "externalRoyaltyPolicy",
                "type": "address"
            }
        ],
        "name": "ExternalRoyaltyPolicyRegistered",
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
                "indexed": false,
                "internalType": "uint256",
                "name": "maxParents",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "maxAncestors",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "accumulatedRoyaltyPoliciesLimit",
                "type": "uint256"
            }
        ],
        "name": "IpGraphLimitsUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "ipRoyaltyVault",
                "type": "address"
            }
        ],
        "name": "IpRoyaltyVaultDeployed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiverIpId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "payerAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountAfterFee",
                "type": "uint256"
            }
        ],
        "name": "LicenseMintingFeePaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "royaltyPolicy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "licensePercent",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "externalData",
                "type": "bytes"
            }
        ],
        "name": "LicensedWithRoyalty",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "parentIpIds",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "licenseRoyaltyPolicies",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint32[]",
                "name": "licensesPercent",
                "type": "uint32[]"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "externalData",
                "type": "bytes"
            }
        ],
        "name": "LinkedToParents",
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
                "internalType": "uint256",
                "name": "royaltyFeePercent",
                "type": "uint256"
            }
        ],
        "name": "RoyaltyFeePercentSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiverIpId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "payerIpId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountAfterFee",
                "type": "uint256"
            }
        ],
        "name": "RoyaltyPaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "royaltyPolicy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "RoyaltyPolicyWhitelistUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "RoyaltyTokenWhitelistUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "treasury",
                "type": "address"
            }
        ],
        "name": "TreasurySet",
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
        "name": "IP_ASSET_REGISTRY",
        "outputs": [
            {
                "internalType": "contract IGroupIPAssetRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IP_GRAPH",
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
        "name": "MAX_PERCENT",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
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
            }
        ],
        "name": "accumulatedRoyaltyPolicies",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
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
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "getAncestorsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
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
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "globalRoyaltyStack",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
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
                "name": "ancestorIpId",
                "type": "address"
            }
        ],
        "name": "hasAncestorIp",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "accessManager",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "parentLimit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ancestorLimit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accumulatedRoyaltyPoliciesLimit",
                "type": "uint256"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ipRoyaltyVaultBeacon",
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
                "name": "ipId",
                "type": "address"
            }
        ],
        "name": "ipRoyaltyVaults",
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
                "name": "ipRoyaltyVault",
                "type": "address"
            }
        ],
        "name": "isIpRoyaltyVault",
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
                "name": "externalRoyaltyPolicy",
                "type": "address"
            }
        ],
        "name": "isRegisteredExternalRoyaltyPolicy",
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
                "name": "royaltyPolicy",
                "type": "address"
            }
        ],
        "name": "isWhitelistedRoyaltyPolicy",
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
                "name": "token",
                "type": "address"
            }
        ],
        "name": "isWhitelistedRoyaltyToken",
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
        "name": "maxAccumulatedRoyaltyPolicies",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxAncestors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxParents",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxPercent",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "pure",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "royaltyPolicy",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "licensePercent",
                "type": "uint32"
            },
            {
                "internalType": "bytes",
                "name": "externalData",
                "type": "bytes"
            }
        ],
        "name": "onLicenseMinting",
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
                "internalType": "address[]",
                "name": "parentIpIds",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "licenseRoyaltyPolicies",
                "type": "address[]"
            },
            {
                "internalType": "uint32[]",
                "name": "licensesPercent",
                "type": "uint32[]"
            },
            {
                "internalType": "bytes",
                "name": "externalData",
                "type": "bytes"
            }
        ],
        "name": "onLinkToParents",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "receiverIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "payLicenseMintingFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiverIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payerIpId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "payRoyaltyOnBehalf",
        "outputs": [],
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
                "name": "externalRoyaltyPolicy",
                "type": "address"
            }
        ],
        "name": "registerExternalRoyaltyPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "royaltyFeePercent",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
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
                "internalType": "uint256",
                "name": "parentLimit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ancestorLimit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accumulatedRoyaltyPoliciesLimit",
                "type": "uint256"
            }
        ],
        "name": "setIpGraphLimits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "setIpRoyaltyVaultBeacon",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "royaltyFeePercent",
                "type": "uint32"
            }
        ],
        "name": "setRoyaltyFeePercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "timestampInterval",
                "type": "uint256"
            }
        ],
        "name": "setSnapshotInterval",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "treasury",
                "type": "address"
            }
        ],
        "name": "setTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "snapshotInterval",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "ipId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "totalRevenueTokensReceived",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury",
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
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newVault",
                "type": "address"
            }
        ],
        "name": "upgradeVaults",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "royaltyPolicy",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "whitelistRoyaltyPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "whitelistRoyaltyToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;