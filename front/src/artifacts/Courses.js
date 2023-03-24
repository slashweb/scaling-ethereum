import {CHAIN_ID} from "../constants";

export const CoursesArtifact = {
    address: {
        [CHAIN_ID]: '0x5a56E8b252761689bCE2364F614d3C9D34EF0bb4'
    },
    abi: [
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
            "inputs": [],
            "stateMutability": "nonpayable",
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
        }
    ]
}