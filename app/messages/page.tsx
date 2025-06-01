"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Send, Inbox, Mail, User, ArrowLeft, Home } from "lucide-react"

// Mock message data
const mockMessages = [
  {
    id: 1,
    from: "John Smith",
    subject: "Property Inquiry - Downtown Apartment",
    preview: "Hi, I'm interested in the downtown apartment listing...",
    time: "2 hours ago",
    read: false,
    avatar: "JS",
  },
  {
    id: 2,
    from: "Sarah Johnson",
    subject: "Viewing Schedule",
    preview: "Can we reschedule the property viewing for next week?",
    time: "5 hours ago",
    read: true,
    avatar: "SJ",
  },
  {
    id: 3,
    from: "Michael Brown",
    subject: "Contract Questions",
    preview: "I have a few questions about the purchase contract...",
    time: "1 day ago",
    read: false,
    avatar: "MB",
  },
  {
    id: 4,
    from: "Emily Davis",
    subject: "Thank You",
    preview: "Thank you for helping us find our dream home!",
    time: "2 days ago",
    read: true,
    avatar: "ED",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredMessages = messages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => !m.read).length

  const handleBackToDashboard = () => {
    window.location.href = "/dashboard"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-gray-600 mt-2">Communicate with your clients</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBackToDashboard}>
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedMessage === message.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                        {message.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!message.read ? "text-gray-900" : "text-gray-600"}`}>
                            {message.from}
                          </p>
                          <p className="text-xs text-gray-500">{message.time}</p>
                        </div>
                        <p className={`text-sm ${!message.read ? "font-medium text-gray-900" : "text-gray-600"}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                        {!message.read && <Badge className="mt-1 bg-blue-100 text-blue-800">New</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedMessage ? messages.find((m) => m.id === selectedMessage)?.subject : "Select a message"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{messages.find((m) => m.id === selectedMessage)?.from}</p>
                      <p className="text-sm text-gray-500">{messages.find((m) => m.id === selectedMessage)?.time}</p>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p>
                      Hi there,
                      <br />
                      <br />
                      {messages.find((m) => m.id === selectedMessage)?.preview}
                      <br />
                      <br />I would appreciate if you could get back to me with more details about the property,
                      including availability for viewing and any additional information that might be helpful.
                      <br />
                      <br />
                      Thank you for your time and I look forward to hearing from you soon.
                      <br />
                      <br />
                      Best regards,
                      <br />
                      {messages.find((m) => m.id === selectedMessage)?.from}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex space-x-2">
                      <Input placeholder="Type your reply..." className="flex-1" />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No message selected</h3>
                  <p className="text-gray-500">Choose a message from the list to view its content.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
