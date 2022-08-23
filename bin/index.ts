#!/usr/bin/env ts-node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { decrypt } from "../lib/decrypt"

import fs from "fs"

import type { EncryptedKeystoreV3Json } from "web3-core/types"

yargs(hideBin(process.argv))
  .scriptName("eth-helper")
  .usage("$0 <cmd> [args]")
  .command(
    "extract-private-key",
    "extracts private key from ethereum key file",
    (yargs) => {
      yargs
        .option("key-file-path", {
          alias: "k",
          demandOption: true,
          type: "string",
        })
        .option("password-file-path", {
          alias: "p",
          demandOption: true,
          type: "string",
        })
        .option("output", {
          alias: "o",
          demandOption: true,
          type: "string",
        })
    },
    (argv) => {
      const keyFilePath: string = argv.keyFilePath as string
      const passwordFilePath: string = argv.passwordFilePath as string
      const outputFilePath: string = argv.output as string

      console.log(`extracting private key from key file: ${keyFilePath}`)

      const keyFile: EncryptedKeystoreV3Json = JSON.parse(
        fs.readFileSync(keyFilePath, "utf8")
      )
      const password = fs.readFileSync(passwordFilePath, "utf8")

      const { privateKey } = decrypt(keyFile, password)

      fs.writeFileSync(outputFilePath, privateKey)

      console.log(`private key stored in file: ${outputFilePath}`)
    }
  )
  .help().argv
