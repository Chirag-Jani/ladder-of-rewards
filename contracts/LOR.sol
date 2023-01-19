// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ladder is ERC20 {
    // handle funds

    uint256 public signupBonus = 100;

    struct User {
        address userAddress;
        uint256 balance;
        string code;
        string refferedBy;
    }

    mapping(address => User) getUser;
    mapping(address => bool) userExist;
    mapping(string => bool) codeExist;
    mapping(string => User) getUserByCode;
    mapping(uint256 => uint256) levelReward;

    constructor() ERC20("UniQual iTech", "UQ") {
        levelReward[1] = (signupBonus * 15) / 100;
        levelReward[2] = (signupBonus * 12) / 100;
        levelReward[3] = (signupBonus * 9) / 100;
        levelReward[4] = (signupBonus * 7) / 100;
        levelReward[5] = (signupBonus * 5) / 100;
    }

    function register(string memory referalCode, string memory code) public {
        require(
            keccak256(bytes(referalCode)) != keccak256(bytes(code)),
            "Referal code can not be the same as yours"
        );
        require(userExist[msg.sender] == false, "User exist");
        require(codeExist[code] == false, "Code alredy taken");

        _mint(msg.sender, signupBonus * 10**18);
        emit InitialReward(msg.sender, signupBonus);

        userExist[msg.sender] = true;

        codeExist[code] = true;

        getUserByCode[code] = User(msg.sender, signupBonus, code, referalCode);

        getUser[msg.sender] = User(msg.sender, signupBonus, code, referalCode);

        // if referal code is not null
        if (keccak256(bytes(referalCode)) != keccak256(bytes(""))) {
            for (uint256 i = 1; i <= 5; i++) {
                // get user
                User storage refferer = getUserByCode[referalCode];

                // reward based on level
                if (refferer.userAddress != address(0)) {
                    _mint(refferer.userAddress, levelReward[i] * 10**18);
                    emit ReferalReward(
                        msg.sender,
                        refferer.userAddress,
                        levelReward[i] * 10**18
                    );
                }

                // update code
                referalCode = refferer.refferedBy;
            }
        }
    }

    // to get the balance of the user
    function getBalance(address addr) public view returns (uint256) {
        return balanceOf(addr);
    }

    event InitialReward(address indexed user, uint256 indexed reward);
    event ReferalReward(
        address indexed codeUsedBy,
        address indexed codeUsedOf,
        uint256 indexed amount
    );
}
