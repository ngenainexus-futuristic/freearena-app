import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const signUp = async () => {
    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert('Account created successfully!');
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const signIn = async () => {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert('Login successful!');
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>FreeArena App</h1>
      <h2>Login / Signup</h2>
      
      {user ? (
        <div>
          <p>Welcome: {user.email}</p>
          <button onClick={logOut} style={{ padding: '10px 20px' }}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={signUp} style={{ marginRight: '10px', padding: '10px 20px' }}>Sign Up</button>
          <button onClick={signIn} style={{ padding: '10px 20px' }}>Login</button>
        </div>
      )}
    </div>
  );
}
