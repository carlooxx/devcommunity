import React, { Fragment, useEffect } from "react";
import { getProfile } from "../../action/profile";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

const Profile = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.profile.isLoading);
  const profile = useSelector((state) => state.profile.profile);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const Loading = useSelector((state) => state.authReducer.isLoading);
  const user = useSelector((state) => state.authReducer.user);
  useEffect(() => {
    dispatch(getProfile(match.params.id));
  }, [dispatch]);
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated &&
            Loading === false &&
            user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
