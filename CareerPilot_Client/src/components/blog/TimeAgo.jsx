import React from "react";

const TimeAgo = ({ createdAt }) => {
  const getTimeAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = Math.floor((currentDate - createdDate) / 1000); // Difference in seconds

    const days = Math.floor(timeDiff / (60 * 60 * 24));
    const hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return <span>{getTimeAgo(createdAt)}</span>;
};

export default TimeAgo;
