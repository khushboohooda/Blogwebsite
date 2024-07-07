import React from "react";
import {
    faPenToSquare,faTrash
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = ({ id, title, content, editPost, deletePost }) => {
  return (
    <>
      <div className="card card-width bg-dark">
        <section key={id}>
          <h3 className="text-slate-50">{title}</h3>
          <hr className="new1"></hr>
          <p className="text-slate-50">{content}</p>
          <span title="edit post" onClick={() => editPost(id)}>
          <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-300 mx-4  "
            />
          </span>
          <span title="delete post" onClick={() => deletePost(id)} > 
          <FontAwesomeIcon
              icon={faTrash}
              className="text-red-600 pl-4 "
            />
          </span>
        </section>
      </div>
    </>
  );
};

export default Post;