// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract CreatorsContent {

    address private owner;

    struct Content {
        uint256 id;
        address author;
        string title;
        string description;
        uint256 price;
        string video;
        bool deleted;
    }
    
    Content[] public Contents;
    uint256 idCourses;


    constructor() {
        idCourses = 0;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getAllCourses() public view returns (Content[] memory) {
        return Contents;
    }

    function createNewContent(
        string memory title, 
        string memory description, 
        uint256 price, 
        string memory video
    ) public {
        Contents.push(Content(idCourses, msg.sender, title, description, price, video, false));
        idCourses ++;
    }
} 