// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentResume {
    struct Resume {
        string name;
        string branch;
        uint cgpa;
        string[] projectTitles;
        string[] positionsOfResponsibility;
    }

    struct Criteria {
        uint minCg;
        string[] eligibleBranch;
    }

    mapping(uint => Resume) public resumes;
    mapping(string => uint[]) public companyShortlists;
    mapping(string => Criteria) public companyCriteria;
    string[] companies;
    uint[] public enrollments;

    function addOrUpdateResume(
        uint _enrollment,
        string memory _name,
        string memory _branch,
        uint _cgpa,
        string[] memory _projectTitles,
        string[] memory _positionsOfResponsibility
    ) public {
        Resume storage resume = resumes[_enrollment];
        resume.name = _name;
        resume.branch = _branch;
        resume.cgpa = _cgpa;
        resume.positionsOfResponsibility = _positionsOfResponsibility;

        if (!isEnrollmentRegistered(_enrollment)) {
            enrollments.push(_enrollment);
        }
    }

    function getResume(uint _enrollment) public view returns (Resume memory) {
        return resumes[_enrollment];
    }

    function getEnrollmentList() public view returns (uint[] memory) {
        return enrollments;
    }

    function isEnrollmentRegistered(
        uint _enrollment
    ) private view returns (bool) {
        for (uint i = 0; i < enrollments.length; i++) {
            if (enrollments[i] == _enrollment) {
                return true;
            }
        }
        return false;
    }

    function shortlistCandidates(
        string memory companyName,
        uint minCgpa,
        string[] memory eligibleBranches
    ) public {
        uint[] storage shortlist = companyShortlists[companyName];
        for (uint i = 0; i < enrollments.length; i++) {
            uint enrollment = enrollments[i];
            Resume memory student = resumes[enrollment];
            if (
                student.cgpa >= minCgpa &&
                isBranchEligible(student.branch, eligibleBranches)
            ) {
                shortlist.push(enrollment);
            }
        }
        companyShortlists[companyName] = shortlist;
        companyCriteria[companyName] = Criteria(minCgpa, eligibleBranches);
        companies.push(companyName);
    }

    function isBranchEligible(
        string memory branch,
        string[] memory eligibleBranches
    ) private pure returns (bool) {
        for (uint i = 0; i < eligibleBranches.length; i++) {
            if (
                keccak256(bytes(branch)) ==
                keccak256(bytes(eligibleBranches[i]))
            ) {
                return true;
            }
        }
        return false;
    }

    function getShorlistedCandidates(
        string memory company
    ) public view returns (uint[] memory, string[] memory, string[] memory) {
        uint[] memory shortlist = companyShortlists[company];
        string[] memory name;
        string[] memory branch;
        for (uint i = 0; i < shortlist.length; i++) {
            Resume memory resume = resumes[shortlist[i]];
            name[i] = resume.name;
            branch[i] = resume.branch;
        }
        return (shortlist, name, branch);
    }

    function getCompanies() public view returns (string[] memory) {
        return companies;
    }

    function getCriteria(
        string memory companyName
    ) public view returns (uint, string[] memory) {
        Criteria memory criteria = companyCriteria[companyName];
        uint minCg = criteria.minCg;
        string[] memory eligibleBrnaches = criteria.eligibleBranch;
        return (minCg, eligibleBrnaches);
    }
}
