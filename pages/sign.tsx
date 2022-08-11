import { useState } from "react"
import Web3 from "web3"

export default function Sign () {
  const [isVerified, setIsVerified] = useState(false)

  const onClick = async () => {
    const provider = window.ethereum || window.web3?.provider || null

    if (!provider) {
      console.error('!provider')
      return
    }

    const web3 = new Web3(provider)
    const [address] = await web3.eth.requestAccounts()

    const message = 'message'
    const password = ''
    const signature = await web3.eth.personal.sign(message, address, password)
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({message, address, signature}),
    })

    const body = await response.json()
    setIsVerified(body.isVerified)
  }

  return (
    <>
      <button onClick={onClick}>Sign</button>
      {isVerified && <p>Verified!</p>}
    </>
  )
}