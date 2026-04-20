import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { validateEmail, validatePassword, validateRequired, validatePhoneNumber, validatePasswordMatch } from '@utils/validation'

interface FormErrors {
    name?: string;
    contactName?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const PartnerRegister: FC = () => {
    const navigate = useNavigate()
    const { registerFoodPartner, isLoadingPartner, error: authError } = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        contactName: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [localError, setLocalError] = useState<string | null>(null)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!validateRequired(formData.name, 'Restaurant Name').isValid) {
            newErrors.name = 'Restaurant Name is required'
        }

        if (!validateRequired(formData.contactName, 'Contact Name').isValid) {
            newErrors.contactName = 'Contact Name is required'
        }

        const phoneValidation = validatePhoneNumber(formData.phoneNumber)
        if (!phoneValidation.isValid) {
            newErrors.phoneNumber = phoneValidation.error
        }

        if (!validateRequired(formData.address, 'Address').isValid) {
            newErrors.address = 'Address is required'
        }

        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error
        }

        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error
        }

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

        const success = await registerFoodPartner({
            name: formData.name,
            contactName: formData.contactName,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            email: formData.email,
            password: formData.password,
        })

        if (success) {
            navigate('/create-food')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Partner Registration</h1>
                <p className="text-sm text-gray-500 mb-6">Register your restaurant</p>

                {(authError || localError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{authError || localError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 max-h-96 overflow-y-auto">
                    <div>
                        <input
                            name="name"
                            type="text"
                            placeholder="Restaurant Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.name ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            name="contactName"
                            type="text"
                            placeholder="Contact Person"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.contactName ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
                        />
                        {errors.contactName && <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>}
                    </div>

                    <div>
                        <input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
                        />
                        {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                        <input
                            name="address"
                            type="text"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.address ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
                        />
                        {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                    </div>

                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
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
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.password ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
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
                            disabled={isLoadingPartner}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                } disabled:opacity-50`}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoadingPartner}
                        className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm mt-4"
                    >
                        {isLoadingPartner ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/food-partner/login" className="text-black font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default PartnerRegister
