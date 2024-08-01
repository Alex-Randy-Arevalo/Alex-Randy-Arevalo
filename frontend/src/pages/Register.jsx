import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

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
        
        if (password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className="container">
            <section className="text-center py-3">
                <h1>
                    <FaUser /> Register
                </h1>
                <p className='lead'>Please create an account</p>
            </section>
            <section className="mx-md-0 mx-lg-5">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control l mb-3" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control l mb-3" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control l mb-3" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control l mb-3" id="password2" name="password2" value={password2} placeholder="Confirm password" onChange={onChange} />
                    </div>
                    <div className="form-group d-grid">
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register