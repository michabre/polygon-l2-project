
import React, { useState } from 'react';

import "../src/styles/landing.css"

const App = () => {
  const [domainName, setDomainName] = useState("MyDomainName.wave")

  return (
    <div classNameName="App">
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
                            
                            
                            <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span>Connect</span>
                                </a>
                            </span>
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
                        <h2 className="subtitle">
                        Sed in libero ut nibh placerat accumsan. Pellentesque commodo eros a enim. Nam quam nunc, blandit vel, luctus pulvinar.
                        </h2>
                        <div className="box">
                            
                            <div className="field is-horizontal is-align-items-center">
                              <div className="field-body">
                                <div className="field">
                                  <p className="control">
                                    <input className="input" type="email" value={domainName} />
                                  </p>
                                </div>
                              </div>
                              <p className="control ml-3">
                                    <a className="button is-info">
                                        Check Availability
                                    </a>
                                </p>
                             
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
            </div>

    </section>
    </div>
  );
}

export default App;
