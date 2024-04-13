// main.js or wherever you have your client-side JavaScript

const deleteBlog = async (id) => {
    try {
        const result= confirm('Are you sure You want to delete this product');
        if(result){
      const response = await fetch(`/api/blogs/deleteBlogs/${id}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        console.log('Blog deleted successfully');
        location.reload(); // Reload the page after successful deletion
      } else {
        console.error('Failed to delete blog:', response.statusText);
      }
    }
} catch (error) {
  console.error('Error deleting blog:', error);
}
}
  // Use this function in your HTML or wherever you handle the delete action
  // For example, in your EJS file:
  // <button class="btn btn-primary" onclick="deleteBlog('<%=blog._id %>')" type="button">Delete</button>
  