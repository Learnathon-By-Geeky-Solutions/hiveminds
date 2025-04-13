const CommunityItem = ({ name, members, description }) => {
  return (
    <div className="border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {members.toLocaleString()} members
      </p>
    </div>
  );
};

export default CommunityItem;
