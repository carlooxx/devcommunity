import React, { useEffect } from "react";
import { getGithub } from "../../action/profile";
import { useDispatch, useSelector } from "react-redux";

const ProfileGithub = ({ username }) => {
  const repos = useSelector((state) => state.profile.repos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGithub(username));
  }, [dispatch, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGithub;
