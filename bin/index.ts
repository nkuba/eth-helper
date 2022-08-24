#!/usr/bin/env node

import { Command } from "commander"
const program = new Command()

import { decryptKeyFile } from "../lib"

import fs from "fs"

import type { EncryptedKeystoreV3Json } from "web3-core/types"

program
  .name("eth-helper")
  .description("CLI for Ethereum Helpers.")
  .version("0.0.1")

program
  .command("extract-private-key")
  .description("Extracts private key from ethereum key file.")
  .requiredOption(
    "-k --key-file-path <path>",
    "path to the encrypted ethereum key file"
  )
  .requiredOption(
    "-p --password-file-path <path>",
    "path to the file containing password to the ethereum key file"
  )
  .requiredOption(
    "-o --output <path>",
    "path to a file where an extracted private key will be stored"
  )
  .action((name, options, command) => {
    const keyFilePath: string = options.keyFilePath as string
    const passwordFilePath: string = options.passwordFilePath as string
    const outputFilePath: string = options.output as string

    console.log(`extracting private key from key file: ${keyFilePath}`)

    const keyFile: EncryptedKeystoreV3Json = JSON.parse(
      fs.readFileSync(keyFilePath, "utf8")
    )
    const password = fs.readFileSync(passwordFilePath, "utf8")

    const { privateKey } = decryptKeyFile(keyFile, password)

    fs.writeFileSync(outputFilePath, privateKey)

    console.log(`private key stored in file: ${outputFilePath}`)
  })

program.parse(process.argv)
