import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
	const [role, setRole] = useState(null);
    const navigate = useNavigate()
	const getRoles = () => {
		const role = localStorage.getItem('ROLE');
		if (role == 'ADMIN') {
			setRole('ADMIN');
		} else if (role == 'PARTNER') {
			setRole('PARTNER');
		} else {
            navigate('/login');
		}
	};

    return [role, getRoles];
}
