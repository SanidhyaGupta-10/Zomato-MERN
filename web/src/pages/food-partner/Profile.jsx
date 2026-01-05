import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/food-partner/${encodeURIComponent(id)}`,
                    { withCredentials: true }
                )
                console.log('Food Partner Profile Data:', res.data)
                const fp = res.data.foodPartner || res.data
                setProfile(fp)
                setVideos(fp.foodItems || [])

            } catch (err) {
                // Improved logging to aid debugging in browser console
                if (err.response) {
                    console.error('Error fetching profile - response:', err.response.status, err.response.data)
                    if (err.response.status === 401) {
                        // unauthorized - redirect to user login
                        window.location.href = '/user/login'
                        return
                    }
                    if (err.response.status === 404) {
                        console.warn('Food partner not found:', id)
                        setProfile(null)
                        setVideos([])
                        return
                    }
                } else if (err.request) {
                    console.error('Error fetching profile - no response received', err.request)
                } else {
                    console.error('Error fetching profile -', err.message)
                }
                console.error(err)
            }
        }

        if (id) fetchProfile()
    }, [id])

    return (


        <div className="min-h-screen bg-gray-50 p-6">
            {/* Profile Header Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex gap-8 mb-6">
                    {/* Profile Image Circle */}
                    <div className="shrink-0">
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-400">
                            {profile && profile.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 text-4xl">📍</span>
                            )}
                        </div>
                    </div>

                    {/* Business Info */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <label className="text-sm text-gray-600 block mb-1">Business Name</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-lg font-semibold text-gray-800">{profile?.name}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">Address</label>
                            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-50">
                                <p className="text-gray-800">{profile?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex gap-12 pt-6 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total meals</p>
                        <p className="text-3xl font-bold text-gray-900">{profile?.totalMeals || 0}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Customer server</p>
                        <p className="text-3xl font-bold text-gray-900">{profile?.customerServer || '0'}</p>
                    </div>
                </div>
            </div>

            {/* Videos Grid Section */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <video
                                src={video.video}
                                controls
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.name}</h3>
                                <p className="text-gray-600 text-sm">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile