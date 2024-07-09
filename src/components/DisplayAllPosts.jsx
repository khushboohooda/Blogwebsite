import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import Post from "./Post";

const DisplayAllPosts = () => {
  // managing states below
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      title: "A Guide to Transformative Travel Experiences",
      content:
        "Travel is more than just visiting new places; it's about embracing new cultures, meeting diverse people, and growing through unique experiences. Each journey offers a chance to step out of your comfort zone, whether you're exploring ancient ruins, savoring local delicacies, or simply marveling at breathtaking landscapes. Transformative travel isn't about the destination, but the stories you collect along the way and the person you become. This blog will guide you through crafting unforgettable travel experiences, from planning your trip to immersing yourself fully in the adventure. Get ready to see the world with fresh eyes and an open heart"
    },
    {
      id: 2,
      title: "A Culinary Adventure Across Continents",
      content:
        "Food is a universal language that connects us all, transcending borders and cultures. Each dish tells a story of its origins, traditions, and the people who create it. Whether it's savoring spicy street food in Bangkok, indulging in rich pastries in Paris, or enjoying a hearty barbecue in Texas, culinary experiences are an integral part of travel. This blog will take you on a delicious journey around the globe, exploring diverse cuisines, discovering hidden gems, and sharing recipes that bring the world to your kitchen. Join us in celebrating the flavors that make our world a vibrant, tasty place to explore."
    }
  ]);
  // const [allPosts, setAllPosts] = useState([]) // can also be used
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  // Initialize useRef (to empty title and content once saved)
  const getTitle = useRef();
  const getContent = useRef();

  // function 1 (accepting title in state by user input)
  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  // function 2 (accepting content/description in state by user input)
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  // function 3 (to save title and content in allPosts state)
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id }]);
    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
  };

  // function 4 (toggle create new post visibility)
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };

  // function 5 (toggle post editing)
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // function 6 (to edit posts)
  const editPost = (id) => {
    setEditPostId(id);
    toggleModifyPostComponent();
  };

  // function 7 (to update the posts)
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content
        };
      }

      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };

  // function 8 (to delete posts)
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };

  if (isCreateNewPost) {
    return (
      <>
      <div className="flex flex-col items-center ">
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getContent={getContent}
          savePost={savePost}
        />
        {/* Cancel Button */}
        <button
          className="btn btn-danger cancel-button"
          onClick={toggleCreateNewPost}
        >
          Cancel
        </button>
        </div>
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });

    return (
      <>
        <ModifyPost
          title={post.title}
          content={post.content}
          updatePost={updatePost}
          savePostTitleToState={savePostTitleToState}
          savePostContentToState={savePostContentToState}
          toggleCreateNewPost={toggleCreateNewPost}
        />
        <button
          className="btn btn-danger cancel-update-button"
          onClick={toggleModifyPostComponent}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
    <div className="bg-slate-800 mt-[-1vh] h-[100vh]">
      <h2 className="text-slate-50">All Posts</h2>
      {!allPosts.length ? (
        <div>
          <li>There are no posts yet.</li>
        </div>
      ) : (
        allPosts.map((eachPost) => (
          <Post
            id={eachPost.id}
            key={eachPost.id}
            title={eachPost.title}
            content={eachPost.content}
            editPost={editPost}
            deletePost={deletePost}
          />
        ))
      )}
      <button
        className="btn btn-outline-info button-edits create-post"
        onClick={toggleCreateNewPost}
      >
        Create New
      </button>
      </div>
    </>
  );
};
export default DisplayAllPosts;