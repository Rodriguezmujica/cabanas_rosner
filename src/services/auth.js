
export const login = (username, password) => {
    // Mock credentials
    if (username === 'admin' && password === 'admin123') {
        const user = { username, role: 'admin', name: 'Administrador' };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    if (username === 'cajero' && password === 'cajero123') {
        const user = { username, role: 'cashier', name: 'Cajero' };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    throw new Error('Credenciales inválidas');
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
