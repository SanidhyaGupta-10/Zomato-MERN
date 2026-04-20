import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSaves } from '@hooks/useSaves'

const Saved: FC = () => {
    const { savedFoods, isLoadingSaves } = useSaves()

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Saved Items</h2>

                {isLoadingSaves ? (
                    <div className="text-gray-600">Loading saved items...</div>
                ) : savedFoods.length === 0 ? (
                    <div className="text-gray-600">No saved items yet.</div>
                ) : (
                    <ul className="space-y-4">
                        {savedFoods.map((item) => (
                            <li
                                key={item._id}
                                className="border p-3 rounded flex items-center justify-between bg-white/30 backdrop-blur-sm hover:bg-white/50 transition"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-600 line-clamp-2">{item.description || 'No description'}</div>
                                </div>
                                <div className="flex items-center gap-4 ml-4">
                                    <div className="text-sm text-gray-700 whitespace-nowrap">
                                        Likes: <span className="font-semibold">{item.likeCount}</span>
                                    </div>
                                    <Link
                                        to={`/food-partner/${item.foodPartner}`}
                                        className="text-red-500 hover:text-red-700 transition whitespace-nowrap"
                                    >
                                        Visit Store
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 flex justify-end">
                    <Link to="/" className="text-sm text-gray-700 hover:underline">
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Saved
