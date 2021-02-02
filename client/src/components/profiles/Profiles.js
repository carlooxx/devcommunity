import React, { Fragment, useEffect } from "react";
import { getAllProfiles } from "../../action/profile";
import Spinner from "../layout/Spinner";
import { useSelector, useDispatch } from "react-redux";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const isLoading = useSelector((state) => state.profile.isLoading);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
