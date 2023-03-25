import { CHAIN_ID } from "../constants";

export const CoursesArtifact = {
    address: {
        [CHAIN_ID]: '0x099B657a3a331866cB196381f2C3C991953Aa45D'
    },
    abi: [
        {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ContentBuys",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "idContent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ammount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isPayed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Contents",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "video",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "deleted",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "mainImage",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Profiles",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "handle",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "profilePic",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "idCourse",
                    "type": "uint256"
                }
            ],
            "name": "buyContent",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "a",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "b",
                    "type": "string"
                }
            ],
            "name": "compareStrings",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "video",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "mainImage",
                    "type": "string"
                }
            ],
            "name": "createNewContent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "handle",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "profilePic",
                    "type": "string"
                }
            ],
            "name": "createNewProfile",
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
                    "internalType": "address payable",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getAllBalanceForCreator",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllCourses",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "video",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "deleted",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "mainImage",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct CreatorsContent.Content[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAvailableBalance",
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
                    "internalType": "address payable",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "indexBuy",
                    "type": "uint256"
                }
            ],
            "name": "getBalanceForSingleBuy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBuysFromAuthor",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "idContent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "ammount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isPayed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct CreatorsContent.ContentBuy[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
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
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getCourseDetail",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "video",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "deleted",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "mainImage",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct CreatorsContent.Content",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMyCourses",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "author",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "video",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "deleted",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "mainImage",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct CreatorsContent.Content[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMyProfile",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "handle",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "addr",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "profilePic",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct CreatorsContent.Profile",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "handle",
                    "type": "string"
                }
            ],
            "name": "setProfileHandle",
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
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                }
            ],
            "name": "setProfileImage",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}