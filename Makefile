# send a copy of the smart contract abi to the client folder
abi:
	cp artifacts/contracts/Domains.sol/Domains.json client/src/contracts
	cp artifacts/contracts/libraries/StringUtils.sol/StringUtils.json client/src/contracts