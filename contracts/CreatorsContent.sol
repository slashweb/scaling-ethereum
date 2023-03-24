// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CreatorsContent {

    // Using counters from zeppeling
    using Counters for Counters.Counter;

    struct Content {
        uint256 id;
        address author;
        string title;
        string description;
        uint256 price;
        string video;
        bool deleted;
        string mainImage;
    }

    struct Profile {
        string handle;
        address addr;
        string profilePic;
    }
    
    Content[] public Contents;
    Profile[] public Profiles;

    Counters.Counter idCourses;

    constructor() {
        idCourses.reset();
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
        string memory video,
        string memory mainImage
    ) public {
        Contents.push(Content(idCourses.current(), msg.sender, title, description, price, video, false, mainImage));
        idCourses.increment();
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getProfileByAddress(address addr) private view returns (Profile memory) {
        for (uint256 i=0; i < Profiles.length; i++) {
            if (Profiles[i].addr == addr) {
                return Profiles[i];
            }
        }

        Profile memory empty;

        return empty;
    }

    function getProficeIndexByAddress(address addr) private view returns (uint256) {
        for (uint256 i=0; i < Profiles.length; i++) {
            if (Profiles[i].addr == addr) {
                return i;
            }
        }
        // In case that cannot find the account
        return Profiles.length;
    }

    function createNewProfile(string memory handle, string memory profilePic) public returns (bool) {
      
        for (uint256 i=0; i < Profiles.length; i++) {
            if (compareStrings(Profiles[i].handle, handle)) {
                return false;
            }
            if (Profiles[i].addr == msg.sender) {
                return false;
            }
        }
        
        Profiles.push(Profile(handle, msg.sender, profilePic));
        return true;
        
    }

    function setProfileHandle(string memory handle) public returns (bool) {

        uint256 index = getProficeIndexByAddress(msg.sender);

        for (uint256 i=0; i < Profiles.length; i++) {
            if (compareStrings(Profiles[i].handle, handle) && i != index) {
                return false;
            }
        }

        Profiles[index].handle = handle;
        return true;
    }

    function setProfileImage(string memory image) public returns (bool) {

        uint256 index = getProficeIndexByAddress(msg.sender);

        Profiles[index].profilePic = image;

        return true;
    }

    function getMyProfile() public view returns (Profile memory) {
        Profile memory localProfile = getProfileByAddress(msg.sender);

        return localProfile;
    }


} 