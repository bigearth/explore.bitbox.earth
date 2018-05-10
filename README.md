# BITBOX

## One Click Blockchain

Quickly fire up a personal Bitcoin/Cash blockchain which you can use to execute commands while controlling how the chain operates.

Inpired by [ganache](http://truffleframework.com/ganache/).

## Setup

* Node v9.4.x
  * `nvm install 9.4.0 && nvm use v9.4.0`
* npm v5.6.x
* webpack v3.10.x
  * `npm install --global webpack`
* XCode
  * `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

## Installation

1. Clone this repo
2. `npm install` the dependencies
3. `npm start` to build the app and run a local server
4. `localhost:3000` to view the app









```js
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
// ////////////////////////////
//
// // 'almost fringe second execute around pioneer hire quote rally extend meat useless saddle goat cable piece pizza hour naive crew neck mystery blade wait'
// // xprv9zQdJvusZZ8boHU67we5Arj1zEAj5PREzyb4p5TzRMQaGy6czV1xY1XL861YkzCykFc2otxhUZoGnvMNCXCGmPmG7PGThAZArrfssDPvFwG
// let setName = (name) => {
//   let script = [BITBOX.Script.opcodes.OP_RETURN, Buffer.from('6d01', 'hex'), Buffer.from(name)];
//   return BITBOX.Script.encode(script)
// }
//
// let hdNode = BITBOX.HDNode.fromXPriv('xprv9zQdJvusZZ8boHU67we5Arj1zEAj5PREzyb4p5TzRMQaGy6czV1xY1XL861YkzCykFc2otxhUZoGnvMNCXCGmPmG7PGThAZArrfssDPvFwG')
//
// let changeNode = BITBOX.HDNode.derivePath(hdNode, "0/0");
//
// let changeAddress = BITBOX.HDNode.toCashAddress(changeNode);
// // bitcoincash:qzrsfmuzwcaqax7yuennqkmrme85uykhggkxkwdqfc
//
// let doThings = (result) => {
//   let tx = result[0]
//
//   let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
//
//   // amount of satoshis at vout
//   let originalAmount = tx.satoshis;
//
//   // txid
//   let txid = tx.txid;
//
//   // index of vout
//   let index = tx.vout;
//
//   // add input txid, vout index
//   transactionBuilder.addInput(txid, index);
//
//   // get size of tx to calculate fee
//   let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
//
//   // calculate fee @ 1 sat/B
//   let sendAmount = originalAmount - byteCount;
//
//   // add cash address output
//   transactionBuilder.addOutput("bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw", sendAmount);
//
//   // create memo OP_RETURN
//   let name = setName('Lakshmi');
//
//   // add OP_RETURN and data as output w/ 0 satoshis
//   transactionBuilder.addOutput(name, 0);
//
//   let key = BITBOX.HDNode.toKeyPair(changeNode);
//
//   let redeemScript;
//   // sign tx
//   transactionBuilder.sign(0, key, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount)
//
//   // to raw hex
//   let hex = transactionBuilder.build().toHex()
//   console.log(hex)
//
//   // POST to full $BCH node
//   BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
// }
//
// BITBOX.Address.utxo(changeAddress).then((result) => { doThings(result); }, (err) => { console.log(err); });
```
