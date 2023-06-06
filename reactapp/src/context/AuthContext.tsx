import { BrowserRouter } from 'react-router-dom';
import { createContext, useState } from 'react';
import App from "../App";

interface AuthContext {
	user: any;
	setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContext>({
	user: null,
	setUser: () => { },
});

const Root = () => {
	const [user, setUser] = useState<any>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default Root;
