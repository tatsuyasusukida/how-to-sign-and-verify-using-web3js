import Web3 from "web3"

export default async function apiVerify (req, res) {
  const {message, address: expected, signature} = req.body
  const web3 = new Web3()
  const actual = web3.eth.accounts.recover(message, signature)
  const isVerified = actual === expected

  res.send({isVerified})
}
