import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { validateEmail, validatePassword, validateRequired, validatePasswordMatch } from '@utils/validation'

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const UserRegister: FC = () => {
    const navigate = useNavigate()
    const { registerUser, isLoadingUser, error: authError } = useAuth()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [localError, setLocalError] = useState<string | null>(null)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Validate full name
        const nameValidation = validateRequired(formData.fullName, 'Full Name')
        if (!nameValidation.isValid) {
            newErrors.fullName = nameValidation.error
        }

        // Validate email
        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error
        }

        // Validate password
        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error
        }

        // Validate password match
        const confirmValidation = validatePasswordMatch(formData.password, formData.confirmPassword)
        if (!confirmValidation.isValid) {
            newErrors.confirmPassword = confirmValidation.error
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

        const success = await registerUser({
            fullName: formData.fullName,
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create Account</h1>
                <p className="text-sm text-gray-500 mb-6">Register as a user</p>

                {(authError || localError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{authError || localError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={isLoadingUser}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        />
                        {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

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

                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            disabled={isLoadingUser}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoadingUser}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingUser ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/user/login" className="text-black font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserRegister
