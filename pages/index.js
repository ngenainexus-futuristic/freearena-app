import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert('Account ban gaya!');
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert('Login ho gaya!');
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    alert('Logout ho gaya!');
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>FreeArena App - Live Ho Gaya!</h1>
      
      {!user ? (
        <div>
          <h2>Login / Signup</h2>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', margin: '10px 0', padding: '8px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', margin: '10px 0', padding: '8px' }}
          />
          <button onClick={signUp} style={{ marginRight: '10px', padding: '10px' }}>
            Sign Up
          </button>
          <button onClick={signIn} style={{ padding: '10px' }}>
            Login
          </button>
        </div>
      ) : (
        <div>
          <h2>Welcome: {user.email}</h2>
          <button onClick={logout} style={{ padding: '10px' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
