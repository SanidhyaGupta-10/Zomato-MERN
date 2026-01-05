import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const navigate = useNavigate()

  // Fetch food items from API (use cookie-based auth if available)
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Send cookies (token) if backend set them on registration/login
        const response = await fetch('http://localhost:3000/api/food', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Food items fetched:', data)
          const items = data.foodItems || []
          setFoodItems(items)
        } else if (response.status === 401) {
          console.error('Unauthorized - invalid or expired token')
          // If unauthorized, clear any stored token and send user to login
          localStorage.removeItem('token')
          navigate('/user/login')
        } else {
          console.error('Failed to fetch food items, status:', response.status)
        }
      } catch (error) {
        console.error('Error fetching food items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodItems()
  }, [])

  // Handle scroll snap behavior
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Snap to nearest video after scroll ends
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = scrollContainer.scrollTop
        const containerHeight = scrollContainer.clientHeight
        const snapIndex = Math.round(scrollPosition / containerHeight)
        
        scrollContainer.scrollTo({
          top: snapIndex * containerHeight,
          behavior: 'smooth'
        })
        setCurrentVideoIndex(snapIndex)
      }, 150)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleVisitStore = (foodItem) => {
    console.log('Visit store clicked for:', foodItem.name)
    // Add navigation logic here
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (foodItems.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">No videos available</div>
      </div>
    )
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollBehavior: 'smooth' }}
    >
      {foodItems.map((item, index) => (
        <div
          key={item._id}
          className="h-screen w-screen flex items-center justify-center relative snap-start"
        >
          {/* Video Background */}
          <video
            src={item.video}
            className="w-full h-full object-cover absolute inset-0"
            autoPlay={index === currentVideoIndex}
            muted
            loop
            playsInline
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Overlay - Bottom positioning */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Description - Truncated to 2 lines */}
            <div className="mb-3">
              <p className="text-white text-sm line-clamp-2 break-words">
                {item.description || 'No description available'}
              </p>
            </div>

            {/* Visit Store Button */}
            <Link to={`/food-partner/${item.foodPartner}`} className="block">
              <button
                onClick={() => handleVisitStore(item)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-full"
              >
                Visit Store
              </button>
            </Link>
          </div>

          {/* Video Title - Bottom Right Corner */}
          <div className="absolute bottom-28 left-4 right-4 z-10">
            <h3 className="text-white text-lg font-bold drop-shadow-lg">
              {item.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home