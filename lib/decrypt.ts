import Web3 from "web3"

import type { Account, EncryptedKeystoreV3Json } from "web3-core/types"

export function decrypt(
  keyFile: EncryptedKeystoreV3Json,
  password: string
): Account {
  const web3 = new Web3()
  return web3.eth.accounts.decrypt(keyFile, password)
}
