pragma solidity >=0.4.21 <0.6.0;

/**
 *    @title An Advertisement Board v0.0.1
 *    @notice Inspired by https://github.com/simondlr/thisartworkisalwaysonsale
 *    font: Straight & 3D Diagonal
 *
 *    ___ __           __  __  __     __  __  __ __ __    ___ __ 
 *     | |_  /\ |\/|  |  \/  \/ _ |  |__)|__)|_ (_ |_ |\ | | (_    
 *     | |__/--\|  |  |__/\__/\__)|  |   | \ |____)|__| \| | __)
 *                                                                                                                                                                                                                                 
 *                                                                                          ,----..                                           
 *       ,---,                              ,---,            ,---,               ,---,.    /   /   \      ,---,        ,-.----.      ,---,   
 *======'  .' \============================'  .' \=========.'  .' `\===========,'  .'  \==/   .     :===='  .' \======\    /  \====.'  .' `\========   
 *     /  ;    '.          ,---,          /  ;    '.     ,---.'     \         ,---.' .' | .   /   ;.  \ /  ;    '.    ;   :    \ ,---.'     \  
 *    :  :       \     ,-+-. /  |        :  :       \   |   |  .`\  |        |   |  |: |.   ;   /  ` ;:  :       \   |   | .\ : |   |  .`\  | 
 *    :  |   /\   \   ,--.'|'   |        :  |   /\   \  :   : |  '  |        :   :  :  /;   |  ; \ ; |:  |   /\   \  .   : |: | :   : |  '  | 
 *    |  :  ' ;.   : |   |  ,"' |        |  :  ' ;.   : |   ' '  ;  :        :   |    ; |   :  | ; | '|  :  ' ;.   : |   |  \ : |   ' '  ;  : 
 *    |  |  ;/  \   \|   | /  | |        |  |  ;/  \   \'   | ;  .  |        |   :     \.   |  ' ' ' :|  |  ;/  \   \|   : .  / '   | ;  .  | 
 *    '  :  | \  \ ,'|   | |  | |        '  :  | \  \ ,'|   | :  |  '        |   |   . |'   ;  \; /  |'  :  | \  \ ,';   | |  \ |   | :  |  ' 
 *    |  |  '  '--'  |   | |  |/         |  |  '  '--'  '   : | /  ;         '   :  '; | \   \  ',  / |  |  '  '--'  |   | ;\  \'   : | /  ;  
 *    |  :  :        |   | |--'          |  :  :        |   | '` ,/          |   |  | ;   ;   :    /  |  :  :        :   ' | \.'|   | '` ,/   
 *====|  | ,'========|   |/==============|  | ,'========;   :  .'============|   :   /====\   \ .'====|  | ,'========:   : :-'==;   :  .'==========  
 *    `--''          '---'               `--''          |   ,.'              |   | ,'       `---`     `--''          |   |.'    |   ,.'       
 *                                                      '---'                `----'                                  `---'      '---'         
 *
 *     __  __ __  __          ┌─────────────────────────────┐       __ __  __ ___ __ 
 *    /  \|_ |_ |/  | /\ |    |  https://www.dogigames.com     |  ||_ |__)(_ | | |_  
 *    \__/|  |  |\__|/--\|__  └─┬─────────────────────────┬─┘  |/\||__|__)__)| | |__ 
 *                                                                                                                        
 *                                                                                                                                                                                                                                                                                                                                                             
 */
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Pausable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';


/**
 * font: Small
 *    _      _   ___                   _ ___               
 *   /_\    /_\ | _ ) ___  __ _ _ _ __| | _ ) __ _ ___ ___ 
 *  / _ \  / _ \| _ \/ _ \/ _` | '_/ _` | _ \/ _` (_-</ -_)
 * /_/ \_\/_/ \_\___/\___/\__,_|_| \__,_|___/\__,_/__/\___|
 *                                                        
 */
contract AABoardBase {

    struct AdBoardData {
        uint256 parentId;
        uint256 price;
        uint256 deposit;
        uint256 lastTaxPayTimestamp;
        string content;
    }
    
    AdBoardData[] internal allAdBoards;    
}


/**
 * font: Small
 *    _      _   ___                   _ ___            _ 
 *   /_\    /_\ | _ ) ___  __ _ _ _ __| |_ _|_ __  _ __| |
 *  / _ \  / _ \| _ \/ _ \/ _` | '_/ _` || || '  \| '_ \ |
 * /_/ \_\/_/ \_\___/\___/\__,_|_| \__,_|___|_|_|_| .__/_|
 *                                               |_|     
 *
 */
contract AABoardImpl is AABoardBase, ERC721Full, ERC721Pausable {

    using SafeMath for uint256;

    address payable public administrator;
    mapping (uint256 => uint256) public taxIncome;
    uint256 public allTaxIncome;
    
    uint256 internal constant PERCENTAGE_BASE = 100;
    uint256 internal constant DEFAULT_TAX_RATE = 100;
    uint256 internal constant DEFAULT_COPYRIGHT_RATE = 50;
    uint256 internal constant DEFAULT_ADMINISTRATION_RATE = 50;

    mapping (uint256 => uint256) private _customTaxRate;
    mapping (uint256 => uint256) private _customCopyrightRate;
    mapping (uint256 => uint256) private _customAdministrationRate;


    /**
    * font: Small
    *  ___             _      
    * | __|_ _____ _ _| |_ ___
    * | _|\ V / -_) ' \  _(_-<
    * |___|\_/\___|_||_\__/__/
    *                    
    */
    event BuyEvent(uint256 indexed adId);
    event CreateEvent(uint256 indexed adId);
    event TaxPayEvent(uint256 indexed adId, uint256 indexed copyrightAmount, uint256 indexed administrationAmount);
    event ChangePriceEvent(uint256 indexed adId);
    event ChangeContentEvent(uint256 indexed adId);
    event AddDepositEvent(uint256 indexed adId);
    event WithdrawDepositEvent(uint256 indexed adId);


    /*
     * font: Small
     *  ___      _    _ _      ___             _   _             
     * | _ \_  _| |__| (_)__  | __|  _ _ _  __| |_(_)___ _ _  ___
     * |  _/ || | '_ \ | / _| | _| || | ' \/ _|  _| / _ \ ' \(_-<
     * |_|  \_,_|_.__/_|_\__| |_| \_,_|_||_\__|\__|_\___/_||_/__/
     *
     */

    modifier adBoardExists(uint256 adId) {
        require(adId >= 0 && _exists(adId));
        _;
    }
     
     /**
     * @dev Constructor
     * @param name The name of the NFT.
     * @param symbol The symbol of the NFT.
     */
    constructor (string memory name, string memory symbol) public ERC721Full(name, symbol) {
        // solhint-disable-previous-line no-empty-blocks
    }

    /**
     * @dev Set custom tax rate of a specified Ad Board or DEFAULT_TAX_RATE will be used
     * @param adId The id of the Ad Board to buy.
     * @param rate Tax rate
     */
    function setTaxRate(uint256 adId, uint256 rate) public onlyPauser adBoardExists(adId) {
        require(rate > 0);
        _customTaxRate[adId] = rate;
    }

    /**
     * @dev Set custom copyright tax rate of a specified Ad Board or DEFAULT_COPYRIGHT_RATE will be used
     * @param adId The id of the Ad Board to buy.
     * @param rate Tax rate
     */
    function setCopyrightRate(uint256 adId, uint256 rate) public onlyPauser adBoardExists(adId) {
        require(rate > 0);
       _customCopyrightRate[adId] = rate;
    }

    /**
     * @dev Set custom administration tax rate of a specified Ad Board or DEFAULT_ADMINISTRATION_RATE will be used
     * @param adId The id of the Ad Board to buy.
     * @param rate Tax rate
     */
    function setAdministrationRate(uint256 adId, uint256 rate) public onlyPauser adBoardExists(adId) {
        require(rate > 0);
       _customAdministrationRate[adId] = rate;
    }

    /**
     * @dev Buy an Ad Board
     * @param adId The id of the Ad Board to buy.
     * @param price The price of the created/forked Ad Board.
     * @param content The content of the created/forked Ad Board.
     */
    function buyAdBoard(uint256 adId, uint256 price, string memory content) public payable adBoardExists(adId) {
        require(msg.sender != address(0));
        require(price >= 0, "buyAdBoard: Price should be greater than or eaqual to 0");

        address currentOwner = ownerOf(adId);
        require(currentOwner != address(0) && msg.sender != currentOwner);

        uint256 collected = 0;
        uint256 owed = 0;
        (collected, owed) = _collectTax(adId);

        AdBoardData storage data = allAdBoards[adId];
        require(msg.value >= data.price, "buyAdBoard: No enough money to buy");

        uint256 totalPayback = data.price;
        if (data.deposit > 0) {
            totalPayback = totalPayback.add(data.deposit);
        }

        if (owed > 0) {
            if (totalPayback > owed) {
                totalPayback = totalPayback.sub(owed);
                collected = collected.add(owed);
                owed = 0;
            } else {
                collected = collected.add(totalPayback);
                owed = owed.sub(totalPayback);
                totalPayback = 0;
            }
        }

        _doCollectTax(adId, data.parentId, collected, totalPayback);

        data.deposit = msg.value.sub(data.price);
        data.price = (data.deposit <= 0) ? 0 : price;
        data.content = content;
        
        _transferAdBoard(currentOwner, msg.sender, adId);

        emit BuyEvent(adId);
    }

    /**
     * @dev Create/forked an Ad Board from its parent 
     * @param price The desired price of the created/forked Ad Board.
     * @param parentId The parent id of the created/forked Ad Board.
     * @param content The content of the created/forked Ad Board.
     */
    function createAdBoard(uint256 price, uint256 parentId, string memory content) public payable {
        require(msg.sender != address(0));
        require(parentId >= 0);
        require(price >= 0, "createAdBoard: Price should be greater than or eaqual to 0");

        AdBoardData memory _adBoard = AdBoardData({
            parentId: (_exists(parentId) ? parentId : 0),
            price: (msg.value <= 0) ? 0 : price,
            deposit: msg.value,
            lastTaxPayTimestamp: block.timestamp,
            content: content
        });

        uint256 adId = allAdBoards.push(_adBoard) - 1;
        _mint(msg.sender, adId);

        emit CreateEvent(adId);
    }

    /**
     * @dev Get all Ad Boards of an owner
     * @param owner owner.
     * @return a list of Ad Boards the owner owns
     */
    function getAdBoardIds(address owner) public view returns (uint256[] memory) {
        return _tokensOfOwner(owner);
    }

    /**
     * @dev Get AdBoardData of an Ad Board
     * @param adId id of the Ad Board.
     * @return data of the Ad Board
     */
    function getAdBoardData(uint256 adId) public view adBoardExists(adId) returns (
        uint256 parentId,
        uint256 price,
        uint256 deposit,
        uint256 lastTaxPayTimestamp,
        string memory content,
        uint256 taxRate) {
        
        AdBoardData storage data = allAdBoards[adId];

        parentId = uint256(data.parentId);
        deposit = depositAbleToWithdraw(adId);
        price = (deposit <= 0) ? 0 : uint256(data.price);
        lastTaxPayTimestamp = uint256(data.lastTaxPayTimestamp);
        content = string(data.content);
        taxRate = (_customTaxRate[adId] == 0) ? DEFAULT_TAX_RATE : _customTaxRate[adId];
    }
    
    /**
     * @dev Change the price of of an Ad Board
     * @param adId Id of the Ad Board.
     * @param price Price to change to
     */
    function changePrice(uint256 adId, uint256 price) public adBoardExists(adId) {
        require(msg.sender == ownerOf(adId), "changePrice: Only owner can change the price");
        require(price >= 0, "changePrice: Incorrect Price");
        
        AdBoardData storage data = allAdBoards[adId];
        data.price = price;

        emit ChangePriceEvent(adId);
    }

    /**
     * @dev Change the content of of an Ad Board
     * @param adId Id of the Ad Board.
     * @param content Content to change to
     */
    function changeContent(uint256 adId, string memory content) public adBoardExists(adId) {
        require(msg.sender == ownerOf(adId), "changePrice: Only owner can change the content");
        
        AdBoardData storage data = allAdBoards[adId];
        data.content = content;

        emit ChangeContentEvent(adId);
    }

    /**
     * @dev Withdraw all the tax income
     */
    function withdrawTaxIncome() public onlyPauser {
        require(allTaxIncome > 0);
        uint256 total = allTaxIncome;
        allTaxIncome = 0;
        administrator.transfer(total);
    }

    /**
     * @dev Add deposit of an Ad Board. Note that anyone can deposit for this Ad Board.
     * @param adId id of the Ad Board.
     */
    function addDeposit(uint256 adId) public payable adBoardExists(adId) {
        require(msg.value > 0);

        uint256 collected = 0;
        uint256 owed = 0;
        (collected, owed) = _collectTax(adId);

        uint256 depositToAdd = msg.value;
        if (owed > 0) {
            if (depositToAdd > owed) {
                depositToAdd = depositToAdd.sub(owed);
                collected = collected.add(owed);
                owed = 0;
                
            } else {
                collected = collected.add(depositToAdd);
                owed = owed.sub(depositToAdd);
                depositToAdd = 0;
            }
        }

        AdBoardData storage data = allAdBoards[adId];
        _doCollectTax(adId, data.parentId, collected, 0);
        data.deposit = data.deposit.add(depositToAdd);
        if (data.deposit <= 0) {
            data.price = 0;
        }

        emit AddDepositEvent(adId);
    }

    /**
     * @dev Withdraw deposit of an Ad Board
     * @param adId id of the Ad Board.
     * @param amount amount to withdraw
     */
    function withdrawDeposit(uint256 adId, uint256 amount) public adBoardExists(adId) {
        require(msg.sender == ownerOf(adId));
        require(amount > 0);

        uint256 collected = 0;
        uint256 owed = 0;
        (collected, owed) = _collectTax(adId);

        AdBoardData storage data = allAdBoards[adId];
        _doCollectTax(adId, data.parentId, collected, 0);

        if (owed <= 0) {
            if (amount > data.deposit) {
                amount = data.deposit;
            }
            data.deposit = data.deposit.sub(amount);
            if (data.deposit <= 0) {
                data.price = 0;
            }
            if (amount > 0) {
                msg.sender.transfer(amount);
            }
        }

        emit WithdrawDepositEvent(adId);
    }
    
    /**
     * @dev Get DepositAble Withdraw of an Ad Board
     * @param adId id of the Ad Board
     */
    function depositAbleToWithdraw(uint256 adId) public view adBoardExists(adId) returns (uint256) {
        AdBoardData storage data = allAdBoards[adId];

        uint256 owed = _taxOwed(adId, data.price, data.lastTaxPayTimestamp);
        if (owed >= data.deposit) {
            return 0;
        } else {
            return data.deposit.sub(owed);
        }
    }
    
    /**
     * @dev Get due date of Ad Board
     * @param adId id of the Ad Board
     */
    function dueDate(uint256 adId) public view adBoardExists(adId) returns (uint256) {
        AdBoardData storage data = allAdBoards[adId];

        if (data.price > 0) {
            uint256 taxRate = (_customTaxRate[adId] == 0) ? DEFAULT_TAX_RATE : _customTaxRate[adId];
            uint256 taxPerSecond = data.price.mul(taxRate).div(PERCENTAGE_BASE).div(30 days);
            return data.lastTaxPayTimestamp + data.deposit.div(taxPerSecond);
        }

        return data.lastTaxPayTimestamp;
    }

    /*
     * font: Small
     *  ___     _                     _   ___             _   _             
     * |_ _|_ _| |_ ___ _ _ _ _  __ _| | | __|  _ _ _  __| |_(_)___ _ _  ___
     *  | || ' \  _/ -_) '_| ' \/ _` | | | _| || | ' \/ _|  _| / _ \ ' \(_-<
     * |___|_||_\__\___|_| |_||_\__,_|_| |_| \_,_|_||_\__|\__|_\___/_||_/__/
     *
     */

    function _doCollectTax(uint256 adId, uint256 parentId, uint256 actualTax, uint256 totalPayback) internal {
        uint256 percent = (_customCopyrightRate[adId] == 0) ? DEFAULT_COPYRIGHT_RATE : _customCopyrightRate[adId];
        uint256 copyrightFee = actualTax.mul(percent).div(PERCENTAGE_BASE);
        uint256 administrationFee = actualTax.sub(copyrightFee);

        if (copyrightFee > 0) {
            address parentOwner = ownerOf(parentId);
            address payable payableParentOwner = address(uint160(parentOwner));
            if (payableParentOwner != address(0)) {
                payableParentOwner.transfer(copyrightFee);
            }
        }

        if (administrationFee > 0) {
            taxIncome[adId] = taxIncome[adId].add(administrationFee);
            allTaxIncome = allTaxIncome.add(administrationFee);
        }
        
        if (totalPayback > 0) {
            address currentOwner = ownerOf(adId);
            address payable payableCurrentOwner = address(uint160(currentOwner));
            payableCurrentOwner.transfer(totalPayback);
        }

        emit TaxPayEvent(adId, copyrightFee, administrationFee);
    }
    /**
     * @dev Collect the tax for the specified Ad Board
     * @param adId The id of Ad Board for which to collect tax
     */
    function _collectTax(uint256 adId) internal returns (uint256 collected, uint256 owed) {
        AdBoardData storage data = allAdBoards[adId];

        uint256 taxToPay = _taxOwed(adId, data.price, data.lastTaxPayTimestamp);
        if (taxToPay == 0) {
            collected = 0;
            owed = 0;
        } else {
            if (taxToPay >= data.deposit) {
                collected = data.deposit;
                owed = taxToPay.sub(collected);
                data.lastTaxPayTimestamp = dueDate(adId);
                data.deposit = 0;
                data.price = 0;
            } else  {
                collected = taxToPay;
                owed = 0;
                data.lastTaxPayTimestamp = block.timestamp;
                data.deposit = data.deposit.sub(taxToPay);
                if (data.deposit <= 0) {
                    data.price = 0;
                }
            }
        }
    }

    /**
     * @dev Tax owed for a specified Ad Board
     * @param price The price of the Ad Board
     * @param lastTaxPayTimestamp last time that tax has paid
     * @return tax owed
     */
    function _taxOwed(uint256 adId, uint256 price, uint256 lastTaxPayTimestamp) internal view returns (uint256) {
        require(price >= 0 && lastTaxPayTimestamp > 0);
        uint256 taxRate = (_customTaxRate[adId] == 0) ? DEFAULT_TAX_RATE : _customTaxRate[adId];
        return price.mul(block.timestamp.sub(lastTaxPayTimestamp)).mul(taxRate).div(PERCENTAGE_BASE).div(30 days);
    }
    
    /**
     * @dev Transfer ownership of a specified Ad Board
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param adId uint256 ID of the token to be transferred
     */
    function _transferAdBoard(address from, address to, uint256 adId) internal {
        _transferFrom(from, to, adId);
    }
}


/**
 * font: Small
 *    _      _   ___                   _ 
 *   /_\    /_\ | _ ) ___  __ _ _ _ __| |
 *  / _ \  / _ \| _ \/ _ \/ _` | '_/ _` |
 * /_/ \_\/_/ \_\___/\___/\__,_|_| \__,_|
 *
 */
contract AABoard is AABoardImpl {

    /**
     * @dev Create a NFT Ad Board contract 
     * @param name The name of the NFT.
     * @param symbol The symbol of the NFT.
     */
    constructor (string memory name, string memory symbol) public AABoardImpl(name, symbol) {
        administrator = msg.sender;
        createAdBoard(uint256(0), uint256(0), "Genesis Board");
    }
    
    /**
     * @dev Prevent direct money transfer to this contract
     */
    function() external payable {
        require(false);
    }
}
