import { Button } from '../generic';

export const UserView: React.FC<any> = ({
  user,
  selected,
  handleClick,
  loggedInUser,
  scoreStatus,
}) => {
  const status =
    Object.keys(scoreStatus).length > 0 ? (
      <span
        className={`rounded px-2 ml-2 text-xs ${
          scoreStatus[0].completionStatus == 'Completed' ? 'bg-bcGreenSuccess' : 'bg-slate-400'
        } py-1 text-white`}
      >
        {scoreStatus[0].completionStatus}
      </span>
    ) : (
      ''
    );
  return (
    <Button
      variant={selected ? 'primary' : 'outline'}
      type='button'
      key={user.id}
      onClick={handleClick}
      customClass='mb-2 ml-2'
    >
      {loggedInUser && user.id != loggedInUser.id ? user.displayName : 'My Review'}
      {status}
    </Button>
  );
};
