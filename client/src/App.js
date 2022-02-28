
import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import contractAbi from './utils/contractABI.json'
import "../src/styles/landing.css"

const TWITTER_HANDLE = 'michabre';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Add the domain you will be minting
const tld = '.wave';
//const CONTRACT_ADDRESS = '0x474A43CD7b031C03537625e378CB944Ee6bfE130';
const CONTRACT_ADDRESS = '0xfE133fA9df9A34355e2255992B60e14878C44441' // ganache

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [domain, setDomain] = useState("")
  const [record, setRecord] = useState("");

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log("Get MetaMask -> https://metamask.io/");
				return;
			}

			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum);
    }
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
  }



  // Form to enter domain name and data
	const renderInputForm = () => {
    return (
      <div className="box">
          <div className="field is-horizontal is-align-items-center">
            <div className="field-body">
              <div className="field width-100">
                <p className="control">
                  <input 
                    className="input" 
                    type="text" 
                    onChange={e => setDomain(e.target.value)}
                    value={domain} 
                    placeholder="Enter a domain"
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">{tld}</p>
                </div>
            </div>
          </div>
          <input
            className="input" 
					  type="text"
					  value={record}
					  placeholder='Describe this domain'
					  onChange={e => setRecord(e.target.value)}
				  />
          <div className="buttons is-justify-content-center mt-3">
            <button className='button is-info' onClick={mintDomain}>
              Mint
            </button>
            <button className="button is-success">
                Set data
            </button>
          </div>
        </div>  
    );
  }

  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) { return }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert('Domain must be at least 3 characters long');
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)	
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1';
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        let tx = await contract.register(domain, {value: ethers.utils.parseEther(price)});
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
  
        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);
          
          // Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();
  
          console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
          
          setRecord('');
          setDomain('');
        }
        else {
          alert("Transaction failed! Please try again");
        }
      }
    }
    catch(error){
      console.log(error);
    }
  }

  // Select Domain Name
  // const checkDomainNameAvailability = (e) => {
  //   let domain = e.target.value.replace(" ", "").toLowerCase()
  //   setDomainName(domain)
  // }


  // This runs our function when the page loads.
	useEffect(() => {
		checkIfWalletIsConnected();
	}, [])

  return (
    <div className="App">
      <section className="hero is-info is-fullheight">
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="../">
                            <span className="has-text-weight-bold is-family-monospace is-size-2">WAV</span>
                        </a>
                        <span className="navbar-burger burger" data-target="navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenu" className="navbar-menu">
                        <div className="navbar-end">
                            
                        {!currentAccount && (
                            <span className="navbar-item">
                                <button className="button is-white is-outlined" onClick={connectWallet}>
                                    <span>Connect</span>
                                </button>
                            </span>
                        )}
                            <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span>OpenSea</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-6 is-offset-3">
                        <h1 className="title">
                            Wave Music Name Service
                        </h1>
                        <div className="box">
                          {currentAccount && renderInputForm()}
                        </div>
                    </div>
                </div>
            </div>

        <footer>
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </footer>
      </section>
    </div>
  );
}

export default App;
