import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {
                            user ? (
                                <li className="nav-item">
                                    <div role='button' className="nav-link text-light" onClick={onLogout}>
                                        <FaSignOutAlt /> Logout
                                    </div>
                                </li>
                            ) :
                                (<>
                                    <li className="nav-item">
                                        <Link to="login" className='nav-link active'>
                                            <FaSignInAlt /> Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="register" className='nav-link active'>
                                            <FaUser /> Register
                                        </Link>
                                    </li>
                                </>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header