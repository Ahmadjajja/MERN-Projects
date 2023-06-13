import React from 'react'

function LandingPage() {
  return (
    // <main>
    <div className='landingPage'>
      <div className="container">
        <div className="row">

          <div className="bonusOffer text-light container p-3 col-10 col-offset-1 mx-2 col-lg-6 col-offset-3 col-md-8 col-md-2">
            <h3>get a $200 bonus then <br /> make it better</h3>
            <p>Just add savings to a new Online Checking account and maximize <br /> your bonus to $250.</p>
            <button type="button" className='btn btn-light text-dark' >See Offer</button>
          </div>
        </div>
      </div>
    </div>
    // {/* </main> */}
  )
}

export default LandingPage