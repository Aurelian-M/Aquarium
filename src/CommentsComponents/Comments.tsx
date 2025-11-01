
import { useContext, useEffect, useState } from "react";
import type { Comments } from "../context/types";
import { useAuth } from "../context/authContext";
import styles from './Comments.module.css';
import { ProductsContext } from "../context/ProductsContext";


export default function CommentsSection() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comments[]>([]);
  const { user } = useAuth();
 const { state, dispatch } = useContext(ProductsContext);

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/comments");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: Comments[] = await res.json();
       console.log("Fetched comments:", data);
      setComments(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
 

const addComment = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!text.trim() || !user) return;

  try {
    const response = await fetch("http://localhost:3001/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text, 
        userId: user.id || null,
        username: user.username,
        role: user.role
      }),
    });

    if (!response.ok) throw new Error("Failed to post comment");

    setText("");
    fetchComments();
    dispatch({ type: "TOGGLE_LIST" })
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

   const deleteComment = async (id: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete comment!");
      }

      if (res.status !== 204) { 
      const data = await res.json();
      console.log(data);
    }

      alert("Comment deleted!");
      fetchComments(); 
    } catch (err) {
      console.error("❌ Deletion failed:", err);
    }
  };

  return (
    <section >
      <h2 style={{fontSize:'2rem'}}>Tell us your thoughts!</h2>
     {state.showlist && (
     <form onSubmit={addComment} 
      className={styles.commentsForm}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Write your comment..."
        />
        <button type="submit">Submit</button>
      </form> 
       )}
      <ul>
        {comments.map((comm) => (
          <li key={comm.id}>
            <small>{new Date(comm.createdAt).toLocaleString()}</small>
            <strong>{comm.username} ({comm.role})</strong>: {comm.text} 
             {user!.role === 'admin' && <button 
              onClick={()=> {deleteComment(comm.id)}} 
              className={styles.deleteBtn} 
             > X</button>}       
          </li>
        ))} 
      </ul>
     
    </section>
  );
}
  