import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from '../appwrite/postService'
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false; // post hona hi chahiye aur userdata jab hai , tab post ka user id aur userdata se jo user id mila hai woh same hai toh author hia 
                                                                                // auther hai toh edit aur delete button dikhayenge 
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const handleLike = async () => {
        if (!userData) {
            alert("Please log in to like posts.");
            return;
        }
        const updatedLikedBy = post.likedBy?.includes(userData.$id)
        ? post.likedBy.filter(id => id !== userData.$id) // Unlike
        : [...(post.likedBy || []), userData.$id]; // Like

        const updatedPost = {
            ...post,
            likedBy: updatedLikedBy,
        };
    
        const result = await service.updatePost(post.$id, { likedBy: updatedLikedBy });
        if (result) setPost(updatedPost);
    };


    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                {console.log("Preview URL:", service.getFilePreview(post.featuredImage))}
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    <div className="mt-4">
    <button
        onClick={handleLike}
        className={`px-4 py-2 rounded-lg ${
            post.likedBy?.includes(userData?.$id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
        }`}
    >
        👍 {post.likedBy?.length || 0}
    </button>
</div>


                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}