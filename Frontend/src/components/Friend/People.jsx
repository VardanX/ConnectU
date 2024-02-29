import FriendList from "./FriendList";
import PeopleYouMayKnow from "./PeopleYouMayKnow";

export default function People({ mobile }) {
  return (
    <div
      className={`${
        mobile ? "block" : "hidden w-1/4 mt-24"
      } lg:flex flex-col space-y-8`}
    >
      <FriendList />
      <PeopleYouMayKnow />
    </div>
  );
}
