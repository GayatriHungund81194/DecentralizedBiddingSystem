pragma solidity ^0.5.0;

contract Bid {

    struct Item {
        int id;
        string itemName;
        int maxPrice;
    }

    mapping(int => Item) public items;
    int public itemsCount;
   
    int public winner=0;
    string public winner_name;


    mapping(address => Item) public biditems;
    // constructor () public {
    //     addItem("Item 1");
    //     addItem("Item 2");
    // }

    int [] public bidList;

    function addItem (string memory _name, int _price) public {
        itemsCount=itemsCount +1;
        items[itemsCount] = Item(itemsCount, _name, _price);
        //bidList.push(itemsCount);
    }

    function getItemsCount() public view returns(int) {
        return itemsCount;
    }

    function bid(int _id, int _price) public{
        if (_price >= items[_id].maxPrice) {
            items[_id].maxPrice = _price;
        }
    }

    function getMaxBids() public {
      
      for (int i = 0; i < itemsCount; i++) {
            if (items[i].maxPrice > winner) {
                winner=items[i].maxPrice;
                winner_name=items[i].itemName;
            }
        
    }
}

function getWinnerID() public view returns(int) {
         return winner;
     }

     function getWinnerName() public view returns(string memory) {
         return winner_name;
     }


}
