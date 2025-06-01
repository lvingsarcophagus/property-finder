export async function getUserById(userId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: userId,
      name: "Demo User",
      email: "demo@example.com",
      avatar_url: "/placeholder.svg?height=40&width=40",
      role: "user",
      broker_type: "individual",
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }
}

export async function updateUserProfile(userId: string, userData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { ...userData, id: userId }
  } catch (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }
}

// Property related functions
export async function getAllProperties() {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "1",
        title: "Modern Downtown Condo",
        price: 450000,
        location: "Downtown",
        bedrooms: 2,
        bathrooms: 2,
        square_feet: 1200,
        property_type: "condo",
        status: "for_sale",
        description: "Beautiful modern condo in the heart of downtown",
        created_at: new Date().toISOString(),
        users: {
          id: "demo-user-123",
          name: "Demo User",
          email: "demo@example.com",
          avatar_url: "/placeholder.svg?height=40&width=40",
        },
        property_amenities: [{ amenities: { id: "1", name: "Pool" } }, { amenities: { id: "2", name: "Gym" } }],
        property_images: [{ id: "1", url: "/placeholder.svg?height=300&width=400" }],
      },
      {
        id: "2",
        title: "Suburban Family Home",
        price: 650000,
        location: "Suburbs",
        bedrooms: 4,
        bathrooms: 3,
        square_feet: 2500,
        property_type: "house",
        status: "for_sale",
        description: "Spacious family home with large backyard",
        created_at: new Date().toISOString(),
        users: {
          id: "demo-user-123",
          name: "Demo User",
          email: "demo@example.com",
          avatar_url: "/placeholder.svg?height=40&width=40",
        },
        property_amenities: [{ amenities: { id: "3", name: "Garden" } }, { amenities: { id: "4", name: "Garage" } }],
        property_images: [{ id: "2", url: "/placeholder.svg?height=300&width=400" }],
      },
    ]
  } catch (error) {
    console.error("Error fetching properties:", error)
    throw new Error("Failed to fetch properties")
  }
}

export async function getPropertyById(propertyId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: propertyId,
      title: "Demo Property",
      price: 500000,
      location: "Demo Location",
      bedrooms: 3,
      bathrooms: 2,
      square_feet: 1800,
      property_type: "house",
      status: "for_sale",
      description: "This is a demo property for preview purposes",
      created_at: new Date().toISOString(),
      users: {
        id: "demo-user-123",
        name: "Demo User",
        email: "demo@example.com",
        avatar_url: "/placeholder.svg?height=40&width=40",
      },
      property_amenities: [{ amenities: { id: "1", name: "Pool" } }, { amenities: { id: "2", name: "Gym" } }],
      property_images: [{ id: "1", url: "/placeholder.svg?height=300&width=400" }],
    }
  } catch (error) {
    console.error("Error fetching property:", error)
    throw new Error("Failed to fetch property")
  }
}

export async function createProperty(propertyData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { ...propertyData, id: Date.now().toString() }
  } catch (error) {
    console.error("Error creating property:", error)
    throw new Error("Failed to create property")
  }
}

export async function updateProperty(propertyId: string, propertyData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { ...propertyData, id: propertyId }
  } catch (error) {
    console.error("Error updating property:", error)
    throw new Error("Failed to update property")
  }
}

export async function deleteProperty(propertyId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return true
  } catch (error) {
    console.error("Error deleting property:", error)
    throw new Error("Failed to delete property")
  }
}

// Amenities related functions
export async function getAllAmenities() {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return [
      { id: "1", name: "Pool" },
      { id: "2", name: "Gym" },
      { id: "3", name: "Garden" },
      { id: "4", name: "Garage" },
      { id: "5", name: "Balcony" },
    ]
  } catch (error) {
    console.error("Error fetching amenities:", error)
    throw new Error("Failed to fetch amenities")
  }
}

export async function addPropertyAmenity(propertyId: string, amenityId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return { property_id: propertyId, amenity_id: amenityId }
  } catch (error) {
    console.error("Error adding amenity:", error)
    throw new Error("Failed to add amenity")
  }
}

export async function removePropertyAmenity(propertyId: string, amenityId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return true
  } catch (error) {
    console.error("Error removing amenity:", error)
    throw new Error("Failed to remove amenity")
  }
}

// Image related functions
export async function addPropertyImage(propertyId: string, imageUrl: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { id: Date.now().toString(), property_id: propertyId, url: imageUrl }
  } catch (error) {
    console.error("Error adding image:", error)
    throw new Error("Failed to add image")
  }
}

export async function removePropertyImage(imageId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return true
  } catch (error) {
    console.error("Error removing image:", error)
    throw new Error("Failed to remove image")
  }
}

// Subscription related functions
export async function getAllSubscriptions() {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "basic",
        name: "Basic Plan",
        price: 29,
        features: ["5 listings", "Basic support", "Standard analytics"],
      },
      {
        id: "pro",
        name: "Pro Plan",
        price: 79,
        features: ["25 listings", "Priority support", "Advanced analytics", "Custom branding"],
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        price: 199,
        features: ["Unlimited listings", "24/7 support", "Full analytics suite", "API access"],
      },
    ]
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    throw new Error("Failed to fetch subscriptions")
  }
}

export async function getUserSubscription(userId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      id: "user-sub-1",
      user_id: userId,
      subscription_id: "pro",
      status: "active",
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subscriptions: {
        id: "pro",
        name: "Pro Plan",
        price: 79,
        features: ["25 listings", "Priority support", "Advanced analytics", "Custom branding"],
      },
    }
  } catch (error) {
    console.error("Error fetching user subscription:", error)
    return null
  }
}

export async function createUserSubscription(userId: string, subscriptionId: string, paymentDetails: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id: Date.now().toString(),
      user_id: userId,
      subscription_id: subscriptionId,
      status: "active",
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      payment_details: paymentDetails,
    }
  } catch (error) {
    console.error("Error creating subscription:", error)
    throw new Error("Failed to create subscription")
  }
}

// Calendar and events related functions
export async function getUserEvents(userId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "1",
        user_id: userId,
        title: "Property Viewing",
        description: "Show downtown condo to potential buyers",
        start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        user_id: userId,
        title: "Client Meeting",
        description: "Discuss new listing requirements",
        start_time: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 49 * 60 * 60 * 1000).toISOString(),
      },
    ]
  } catch (error) {
    console.error("Error fetching events:", error)
    throw new Error("Failed to fetch events")
  }
}

export async function createEvent(eventData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { ...eventData, id: Date.now().toString() }
  } catch (error) {
    console.error("Error creating event:", error)
    throw new Error("Failed to create event")
  }
}

export async function updateEvent(eventId: string, eventData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { ...eventData, id: eventId }
  } catch (error) {
    console.error("Error updating event:", error)
    throw new Error("Failed to update event")
  }
}

export async function deleteEvent(eventId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return true
  } catch (error) {
    console.error("Error deleting event:", error)
    throw new Error("Failed to delete event")
  }
}

// Notification related functions
export async function getUserNotifications(userId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "1",
        user_id: userId,
        title: "New Message",
        message: "You have a new inquiry about your downtown listing",
        read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: userId,
        title: "Property Update",
        message: "Your listing has been approved and is now live",
        read: true,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  } catch (error) {
    console.error("Error fetching notifications:", error)
    throw new Error("Failed to fetch notifications")
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return { id: notificationId, read: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }
}

export async function createNotification(notificationData: any) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { ...notificationData, id: Date.now().toString() }
  } catch (error) {
    console.error("Error creating notification:", error)
    throw new Error("Failed to create notification")
  }
}
