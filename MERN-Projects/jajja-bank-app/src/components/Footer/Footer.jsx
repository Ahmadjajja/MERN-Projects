import React from 'react'

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <footer >
        <div className="container-fluid" id='footer' >
          <div className="row">
            <div className="col">
              <p >&copy; {year} Bank.Made with  <span className='text-white'>❤</span> by <a className='text-white fw-bold' target="_blank" style={{textDecoration:"none"}} href="https://github.com/Ahmadjajja"><span>Ahmad Jajja</span></a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer