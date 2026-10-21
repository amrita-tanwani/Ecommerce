import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  signUp: (name: string, phone: string, email: string, password: string) => { success: boolean; error?: string };
  signIn: (identifier: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'oda_registered_users';
const CURRENT_USER_STORAGE_KEY = 'oda_current_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedActiveUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedActiveUser) {
        setCurrentUser(JSON.parse(storedActiveUser));
      }
    } catch (err) {
      console.error('Failed to load user from localStorage:', err);
    }
  }, []);

  // Sign Up handler
  const signUp = (name: string, phone: string, email: string, password: string) => {
    try {
      const cleanPhone = phone.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();

      // Retrieve existing users from localStorage
      const existingUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const existingUsers: StoredUser[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      // Check if user with same phone or email exists
      const duplicatePhone = existingUsers.find((u) => u.phone === cleanPhone);
      if (duplicatePhone) {
        return { success: false, error: 'An account with this phone number is already registered.' };
      }

      const duplicateEmail = existingUsers.find((u) => u.email === cleanEmail);
      if (duplicateEmail) {
        return { success: false, error: 'An account with this email address is already registered.' };
      }

      // Create new user record
      const newUser: StoredUser = {
        id: `user_${Date.now()}`,
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        password, // stored locally in localStorage
        createdAt: new Date().toISOString(),
      };

      // Save updated users list to localStorage
      existingUsers.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));

      // Set active user (without password)
      const userProfile: User = {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };

      setCurrentUser(userProfile);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userProfile));

      return { success: true };
    } catch (err) {
      console.error('Error during signUp:', err);
      return { success: false, error: 'Could not complete registration. Please try again.' };
    }
  };

  // Sign In handler (matches either phone or email, and password)
  const signIn = (identifier: string, password: string) => {
    try {
      const cleanIdentifier = identifier.trim().toLowerCase();

      // Retrieve users from localStorage
      const existingUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const existingUsers: StoredUser[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      // Find user by phone OR email
      const matchedUser = existingUsers.find(
        (u) => u.phone.toLowerCase() === cleanIdentifier || u.email.toLowerCase() === cleanIdentifier
      );

      if (!matchedUser) {
        return { success: false, error: 'No account found with this phone number or email.' };
      }

      if (matchedUser.password !== password) {
        return { success: false, error: 'Incorrect password. Please verify your credentials.' };
      }

      // Login success: save active user
      const userProfile: User = {
        id: matchedUser.id,
        name: matchedUser.name,
        phone: matchedUser.phone,
        email: matchedUser.email,
        createdAt: matchedUser.createdAt,
      };

      setCurrentUser(userProfile);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userProfile));

      return { success: true };
    } catch (err) {
      console.error('Error during signIn:', err);
      return { success: false, error: 'Login error occurred. Please try again.' };
    }
  };

  // Sign Out handler
  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
