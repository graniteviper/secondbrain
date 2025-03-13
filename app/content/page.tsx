"use client";

import React, { useEffect, useState } from "react";
import { Plus, Loader2, X, Search, CheckCircle, Edit, Trash } from "lucide-react";
import axios from "axios";
import { Button } from "../components/Button";

interface ContentItem {
  id: string;
  username: string;
  title: string;
  description: string;
}

interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "error";
}

const ContentPage = () => {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Content states
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Form validation
  const [addErrors, setAddErrors] = useState({
    title: "",
    description: "",
  });
  
  const [editErrors, setEditErrors] = useState({
    title: "",
    description: "",
  });

  // Show notification toast
  const showNotification = (message: string, type: "success" | "error") => {
    const id = Date.now().toString();
    setNotifications([...notifications, { id, message, type }]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setNotifications(current => current.filter(notification => notification.id !== id));
    }, 3000);
  };

  async function addContent() {
    // Validate form
    const newErrors = {
      title: newTitle.trim() === "" ? "Title is required" : "",
      description: newDescription.trim() === "" ? "Description is required" : "",
    };

    setAddErrors(newErrors);

    // If there are errors, don't submit
    if (newErrors.title || newErrors.description) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/api/content", {
        title: newTitle.trim(),
        desc: newDescription.trim(),
      });

      if (response.status === 200) {
        // console.log(response);
        
        // Add the new item to the array to avoid refetching
        const newItem = {
          id: response.data.id,
          username: "current_user", // You might want to get this from a context or session
          title: newTitle,
          description: newDescription,
        };
        
        setContentItems([newItem, ...contentItems]);
        setNewTitle("");
        setNewDescription("");
        setIsAddModalOpen(false);
        showNotification("Content added successfully!", "success");
      }
    } catch (error) {
      console.error("Failed to add content:", error);
      showNotification("Failed to add content", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateContent() {
    // Validate form
    const newErrors = {
      title: editTitle.trim() === "" ? "Title is required" : "",
      description: editDescription.trim() === "" ? "Description is required" : "",
    };

    setEditErrors(newErrors);

    // If there are errors, don't submit
    if (newErrors.title || newErrors.description) {
      return;
    }

    if (!editingContentId) {
      showNotification("No content selected for editing", "error");
      return;
    }

    setIsEditing(true);
    try {
      // ===== BACKEND CONNECTION CODE GOES HERE =====
      // Example of what the API call might look like:
      await axios.put("http://localhost:3000/api/content", {
        contentId: editingContentId,
        title: editTitle.trim(),
        desc: editDescription.trim(),
      });
      // ============================================

      // Update the local state (this would normally be done after API confirmation)
      setContentItems(contentItems.map(item => 
        item.id === editingContentId 
          ? { ...item, title: editTitle, description: editDescription } 
          : item
      ));
      
      setEditTitle("");
      setEditDescription("");
      setEditingContentId(null);
      setIsEditModalOpen(false);
      showNotification("Content updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update content:", error);
      showNotification("Failed to update content", "error");
    } finally {
      setIsEditing(false);
    }
  }

  async function fetchContent() {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/content");
      // console.log(response);
      
      setContentItems(response.data.contents || []);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      showNotification("Failed to fetch content", "error");
    } finally {
      setIsLoading(false);
    }
  }

  // Filter content items based on search query
  const filteredItems = contentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredItems);
  

  useEffect(() => {
    fetchContent();
    // console.log(filteredItems);
    
  }, []);

  const deletetodo = async (contentId: string) => {
    try {
      await axios.delete("http://localhost:3000/api/content", {
        data: {
          contentId
        }
      });
      
      setContentItems(contentItems.filter(content => content.id !== contentId));
      showNotification("Card deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete content:", error);
      showNotification("Failed to delete content", "error");
    }
  };

  const openEditModal = (item: ContentItem) => {
    setEditingContentId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-400">Your Content</h1>
          
          {/* Search bar */}
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 placeholder-gray-500"
            />
          </div>
          
          <Button 
            variant="blue" 
            size="default"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={16} />}
            className="bg-indigo-600 hover:bg-indigo-700 text-white border-none ml-4"
          >
            Add New
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-indigo-900/20 hover:shadow-xl hover:-translate-y-1">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button 
                      className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 flex items-center"
                      onClick={() => openEditModal(item)}
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </button>
                    <button 
                      className="p-2 rounded-md bg-red-900/60 hover:bg-red-800 text-gray-300 flex items-center"
                      onClick={() => deletetodo(item.id)}
                    >
                      <Trash size={16} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg">
              <p className="text-gray-400 mb-4">
                {searchQuery ? "No matching content found" : "You haven't added any content yet"}
              </p>
              {!searchQuery && (
                <Button 
                  variant="blue" 
                  onClick={() => setIsAddModalOpen(true)}
                  leftIcon={<Plus size={16} />}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                >
                  Create Your First Card
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`flex items-center px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 ${
              notification.type === "success" ? "bg-green-800" : "bg-red-800"
            }`}
            style={{ minWidth: "250px" }}
          >
            {notification.type === "success" && (
              <CheckCircle size={20} className="text-green-400 mr-3" />
            )}
            {notification.type === "error" && (
              <X size={20} className="text-red-400 mr-3" />
            )}
            <p className="text-white">{notification.message}</p>
            <button 
              onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
              className="ml-auto text-white opacity-70 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Content Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
              <h2 className="text-xl font-semibold text-indigo-300">
                Add New Content
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="new-title" className="block text-sm font-medium text-indigo-300 mb-1">
                    Title
                  </label>
                  <input
                    id="new-title"
                    type="text"
                    placeholder="Enter a title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border ${
                      addErrors.title ? 'border-red-500' : 'border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500`}
                  />
                  {addErrors.title && (
                    <p className="mt-1 text-sm text-red-400">{addErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="new-description" className="block text-sm font-medium text-indigo-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="new-description"
                    placeholder="Enter a description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 bg-gray-700 border ${
                      addErrors.description ? 'border-red-500' : 'border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500`}
                  />
                  {addErrors.description && (
                    <p className="mt-1 text-sm text-red-400">{addErrors.description}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="dark"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  variant="blue"
                  onClick={addContent}
                  isLoading={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
              <h2 className="text-xl font-semibold text-indigo-300">
                Edit Content
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-indigo-300 mb-1">
                    Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    placeholder="Enter a title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border ${
                      editErrors.title ? 'border-red-500' : 'border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500`}
                  />
                  {editErrors.title && (
                    <p className="mt-1 text-sm text-red-400">{editErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-indigo-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    placeholder="Enter a description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 bg-gray-700 border ${
                      editErrors.description ? 'border-red-500' : 'border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500`}
                  />
                  {editErrors.description && (
                    <p className="mt-1 text-sm text-red-400">{editErrors.description}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="dark"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  variant="blue"
                  onClick={updateContent}
                  isLoading={isEditing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                >
                  {isEditing ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;