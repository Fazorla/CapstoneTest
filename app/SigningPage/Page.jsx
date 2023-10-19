import React, { useState } from 'react'

function SigningPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className='sign-in-container'>
        <form>
            <div class="fHeader">
                <div>Sign Up</div>
                <div></div>
            </div>
            <div>
                <input type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                
            </div>
        </form>
    </div>
  )
}

export default SigningPage