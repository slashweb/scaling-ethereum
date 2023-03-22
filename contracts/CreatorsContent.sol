// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract CreatorsContent {


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

    function getUserCoursesLen(address user) private view returns (uint256) {
        uint256 len = 0;
        for (uint256 i=0; i < Contents.length ; i++) {
            if (Contents[i].author == user) {
                len ++;
            }
        }
        return len;
    }

    function getCourseDetail(uint256 id) public view returns (Content memory) {
        Content memory detail;

        for (uint256 i=0; i < Contents.length ; i++) {
            if (Contents[i].id == id) {
                detail = Contents[i];
            }
        }
        return detail;
    }

    function getMyCourses() public view returns (Content[] memory) {
        
        // Get Total courses that the user has
        uint256 len = getUserCoursesLen(msg.sender);
        // Index to insert all the user courses
        uint256 indexCourses = 0;
        // Aux variable to push all the user courses
        Content[] memory userCourses = new Content[](len);

        for (uint256 i=0; i < Contents.length ; i++) {
            if (Contents[i].author == msg.sender) {
                userCourses[indexCourses] = Contents[i];
                indexCourses ++;
            }
        }

        return userCourses;
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