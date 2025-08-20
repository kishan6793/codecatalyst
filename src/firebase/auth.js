import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '../conf/conf.js';
import { toast } from 'react-toastify';

export class AuthService {
  static instance = null;
  auth;
  googleProvider;
  firestore;

  constructor() {
    if (AuthService.instance) return AuthService.instance;
    this.auth = getAuth(app);
    this.googleProvider = new GoogleAuthProvider();
    this.firestore = getFirestore(app);
    AuthService.instance = this;
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signupHandler(email, password) {
    try {
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        toast.error('Please enter a valid email address.');
        throw new Error('Invalid email address');
      }
      if (!password || typeof password !== 'string' || password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        throw new Error('Password must be at least 6 characters long');
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      toast.success('Signup successful! Welcome!');
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Signup failed. Please try again.');
      throw error;
    }
  }

  async signinHandler(email, password) {
    try {
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        toast.error('Please enter a valid email address.');
        throw new Error('Invalid email address');
      }
      if (!password || typeof password !== 'string') {
        toast.error('Please enter a valid password.');
        throw new Error('Invalid password');
      }

      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      toast.success('Login successful! Welcome back!');
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Login failed. Please check your credentials and try again.');
      throw error;
    }
  }

  async SignUpWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = result.user;
      toast.success('Google signup successful! Welcome!');
      return user;
    } catch (error) {
      console.error('Error signing up with Google:', error);
      toast.error('Google signup failed. Please try again.');
      throw error;
    }
  }

  async logoutHandler() {
    try {
      await signOut(this.auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Logout failed. Please try again.');
      throw error;
    }
  }

  onAuthStateChanged(callback) {
    try {
      return onAuthStateChanged(this.auth, callback);
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      toast.error('An error occurred. Please refresh the page.');
      throw error;
    }
  }
}

export default AuthService.getInstance();
