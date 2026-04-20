import type { FC, FormEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFood } from '@hooks/useFood'
import { validateRequired, validateVideoFile } from '@utils/validation'

interface FormErrors {
    name?: string;
    video?: string;
}

const CreateFoodPartner: FC = () => {
    const navigate = useNavigate()
    const { createFood, isLoading, error: foodError } = useFood()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<FormErrors>({})
    const [localError, setLocalError] = useState<string | null>(null)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        const nameValidation = validateRequired(name, 'Dish name')
        if (!nameValidation.isValid) {
            newErrors.name = nameValidation.error
        }

        if (!videoFile) {
            newErrors.video = 'Video is required'
        } else {
            const videoValidation = validateVideoFile(videoFile)
            if (!videoValidation.isValid) {
                newErrors.video = videoValidation.error
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0]
        if (file) {
            setVideoFile(file)
            setPreview(URL.createObjectURL(file))
            if (errors.video) {
                setErrors((prev) => ({ ...prev, video: undefined }))
            }
        } else {
            setVideoFile(null)
            setPreview(null)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setLocalError(null)

        if (!validateForm()) {
            return
        }

        if (!videoFile) {
            setErrors((prev) => ({ ...prev, video: 'Video is required' }))
            return
        }

        const success = await createFood({
            name,
            description: description || undefined,
            video: videoFile,
        })

        if (success) {
            navigate('/')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Create Food / Video</h2>

                {(foodError || localError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{foodError || localError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (errors.name) {
                                    setErrors((prev) => ({ ...prev, name: undefined }))
                                }
                            }}
                            placeholder="Enter dish name"
                            disabled={isLoading}
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                                } disabled:opacity-50`}
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description (optional)"
                            disabled={isLoading}
                            className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-400 transition disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video *</label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleVideoChange}
                            disabled={isLoading}
                            className={`w-full border rounded px-3 py-2 disabled:opacity-50 ${errors.video ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.video && <p className="text-xs text-red-600 mt-1">{errors.video}</p>}
                        <p className="text-xs text-gray-500 mt-1">Maximum file size: 100 MB</p>
                    </div>

                    {preview && (
                        <div className="rounded overflow-hidden border mt-4 bg-gray-100">
                            <video src={preview} controls className="w-full h-64 object-cover" />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            disabled={isLoading}
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition disabled:opacity-50"
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFoodPartner
