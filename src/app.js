var bidd = false;
var accUsed = false;
var accCount = 0;
var falgAcc = false;
var count = 0;
App = {
    loading: false,
    contracts: {},
    bidderName: [],
    biddingAcc: [],
    hasBid: false,
    account:'0x0',
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
     
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
      await ethereum.enable()
      console.log("entered");
    },
  
    loadAccount: async () => {
      await web3.eth.getAccounts(function (e,account){
       //if (e == null) {
          accCount = accCount + 1
          App.account = account[accCount];
          if (accUsed == false && count<2){
            var chk = App.bidderName.includes(App.account);
            count = count + 1;
            if (chk == false) {

              App.biddingAcc.push(App.account)

            }
            falgAcc = false;

          } else {

            falgAcc = true;
          }
          

        //}
      });
      
      
    },
  
    loadContract: async () => {
      console.log("Here:",App.account)
      const bidding = await $.getJSON('Bid.json')
      App.contracts.bid = TruffleContract(bidding)
      App.contracts.bid.setProvider(App.web3Provider)
      console.log(App.web3provider)
      // Hydrate the smart contract with values from the blockchain
      App.biddingInfo = await App.contracts.bid.deployed()
      console.log(App.biddingInfo)
    },

    bidAmount: async() =>{
     
      await App.loadAccount()
      console.log("entered bid amount");
      const name = $('#username').val();
      const amount=$('#amount').val();
      var check = App.bidderName.includes(name);
      console.log("Check:",check);
      if (check == true) {
        App.hasBid = true;
      }
      else {
        App.hasBid = false;
      }
      if (App.hasBid == false && falgAcc == false) {
      const bidInfo = await App.contracts.bid.deployed();
      balance = web3.eth.getBalance(App.account);
      const todo= await bidInfo.addItem(name,amount,{from: App.account, gas:3000000});
      const todo2= await bidInfo.addItem(name,amount,{from: App.account, gas:3000000});
      App.biddingAcc.push(App.account)
      App.bidderName.push(name)
      await App.finAmount();
      App.hasBid = true; 
      }else {
      console.log("else")
      var displayResult = "Your Account was used for bidding!!"
      errordiv.append(displayResult);
       $("#errordiv").show();
       $("#resultdiv").hide();
       $("#results").hide();
       $("#msg").hide();
    }
    },

 finAmount: async() =>{
  const bidInfo = await App.contracts.bid.deployed();
    const item_count= await bidInfo.getItemsCount();
    await bidInfo.getMaxBids();
    let winner=await bidInfo.getWinnerID();
    const winner_name=await bidInfo.getWinnerName();
    console.log("abcd",item_count.c[0]);
    console.log("winner",winner.c[0]);
    console.log("winner_name",winner_name);
     $("#msg").show();
    if(item_count.c[0]>6){

      $("#results").show();
        var displayResult = "The winner is " + winner_name + " with bid "+ winner.c[0]
        resultdiv.append(displayResult);
        


    }

  }
}
  
  App.load()
