import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiGet } from '@utils/api'
import type { IFoodPartner, IFood } from '../../../types/models.types'

interface ProfileData {
    partner: IFoodPartner;
    foods: IFood[];
}

const Profile: FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async (): Promise<void> => {
            if (!id) {
                setError('No partner ID provided')
                setIsLoading(false)
                return
            }

            try {
                setIsLoading(true)
                setError(null)

                // Fetch partner profile
                const partnerResponse = await apiGet<IFoodPartner>(`/food-partner/${encodeURIComponent(id)}`)

                if (!partnerResponse.success || !partnerResponse.data) {
                    if (partnerResponse.message === 'Unauthorized') {
                        navigate('/user/login')
                        return
                    }
                    setError(partnerResponse.message || 'Failed to fetch profile')
                    return
                }

                // Fetch foods for this partner (if endpoint exists)
                const foodsResponse = await apiGet<IFood[]>(`/food?partner=${id}`)
                const foods = foodsResponse.success && foodsResponse.data ? foodsResponse.data : []

                setProfileData({
                    partner: partnerResponse.data,
                    foods,
                })
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile'
                setError(errorMessage)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [id, navigate])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-gray-600 text-lg">Loading profile...</div>
            </div>
        )
    }

    if (error || !profileData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-red-600 mb-4">{error || 'Profile not found'}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    const { partner, foods } = profileData

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Profile Header Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex gap-8 mb-6">
                    {/* Profile Icon */}
                    <div className="shrink-0">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-300 to-red-500 flex items-center justify-center border-4 border-white shadow-lg">
                            <span className="text-5xl">🍽️</span>
                        </div>
                    </div>

                    {/* Business Info */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <label className="text-sm text-gray-600 block mb-1">Business Name</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-lg font-semibold text-gray-800">{partner.name}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-600 block mb-1">Contact Person</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-gray-800">{partner.contactName}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-600 block mb-1">Phone</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-gray-800">{partner.phoneNumber}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Address</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-gray-800">{partner.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex gap-12 pt-6 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Videos</p>
                        <p className="text-3xl font-bold text-gray-900">{foods.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Likes</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {foods.reduce((sum, food) => sum + (food.likeCount || 0), 0)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Videos Grid Section */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Videos</h2>

                {foods.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-600 text-lg">No videos available yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                <video src={food.video} controls className="w-full h-48 object-cover bg-gray-200" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{food.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{food.description || 'No description'}</p>
                                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                                        <span>❤️ {food.likeCount} Likes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Back Button */}
            <div className="max-w-6xl mx-auto mt-8">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    )
}

export default Profile
