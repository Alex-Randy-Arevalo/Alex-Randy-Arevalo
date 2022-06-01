import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return <div className="container">
        <section className='text-center py-3'>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p className='lead'>Login and start exploring</p>
        </section>
        <section className="gap-4 mx-md-0 mx-lg-5">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control mb-3" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mb-3" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                </div>
                <div className="form-group d-grid">
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>
        </section>
    </div>
}

export default Login
