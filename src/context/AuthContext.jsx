import React, { createContext, useContext, useState } from 'react';

// AuthContext shares "who is logged in" with every component in the app,
// so we don't have to pass props down through every page (no prop drilling).
const AuthContext = createContext(null);

// A demo member so the login can be tested straight away
const demoMember = { name: 'Youngkeon', email: 'youngkeon@gmail.com', password: 'pet12345' };

// Small helpers to keep data after a page refresh (mock "database" in the browser)
const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore (e.g. private browsing)
  }
};

export const AuthProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const saved = load('ph-members', []);
    // Always make sure the demo account exists, even if older data was saved
    const hasDemo = saved.some((m) => m.email === demoMember.email);
    return hasDemo ? saved : [demoMember, ...saved];
  });
  const [user, setUser] = useState(() => load('ph-user', null)); // null = not logged in

  // Returns an error message, or '' if the login worked
  const login = (email, password) => {
    const member = members.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
    if (!member || member.password !== password) return 'Incorrect email or password.';
    const loggedIn = { name: member.name, email: member.email };
    setUser(loggedIn);
    save('ph-user', loggedIn);
    return '';
  };

  // Returns an error message, or '' if the sign-up worked (and logs the new member in)
  const signup = ({ name, email, password }) => {
    if (members.some((m) => m.email.toLowerCase() === email.trim().toLowerCase())) {
      return 'An account with this email already exists. Please log in instead.';
    }
    const newMember = { name: name.trim(), email: email.trim(), password };
    const updated = [...members, newMember];
    setMembers(updated);
    save('ph-members', updated);
    const loggedIn = { name: newMember.name, email: newMember.email };
    setUser(loggedIn);
    save('ph-user', loggedIn);
    return '';
  };

  const logout = () => {
    setUser(null);
    save('ph-user', null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook: any component can call useAuth() to get the user and the functions
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
