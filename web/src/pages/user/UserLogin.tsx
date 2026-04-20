import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { validateEmail, validateRequired } from '@utils/validation'

interface FormErrors {
    email?: string;
    password?: string;
}

const UserLogin: FC = () => {
    const navigate = useNavigate()
    const { loginUser, isLoadingUser, error: authError } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [localError, setLocalError] = useState<string | null>(null)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Validate email
        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error
        }

        // Validate password
        const passwordValidation = validateRequired(formData.password, 'Password')
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setLocalError(null)

        if (!validateForm()) {
            return
        }

        const success = await loginUser({
            email: formData.email,
            password: formData.password,
        })

        if (success) {
            navigate('/')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear field error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h1>
                <p className="text-sm text-gray-500 mb-6">Login to your account</p>

                {(authError || localError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{authError || localError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoadingUser}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition ${errors.email ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoadingUser}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition ${errors.password ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        />
                        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoadingUser}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingUser ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link to="/user/register" className="text-black font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserLogin
