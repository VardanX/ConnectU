import { toast } from "react-toastify";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "../features/friend/friendApiSlice";

export default function useFriend() {
  const [removeFriend] = useRemoveFriendMutation();
  const [addFriend] = useAddFriendMutation();

  const handleRemoveFriend = async (userId) => {
    await toast.promise(removeFriend({ userId }).unwrap(), {
      pending: {
        render() {
          return "Loading";
        },
      },
      success: {
        render({ data }) {
          return `${data?.message} 👌`;
        },
      },
      error: {
        render({ data }) {
          return `${data?.data?.message} 🤯`;
        },
      },
    });
  };

  const handleAddFriend = async (userId) => {
    await toast.promise(addFriend({ userId }).unwrap(), {
      pending: {
        render() {
          return "Loading";
        },
      },
      success: {
        render({ data }) {
          return `${data?.message} 👌`;
        },
      },
      error: {
        render({ data }) {
          return `${data?.data?.message} 🤯`;
        },
      },
    });
  };
  return { handleRemoveFriend, handleAddFriend };
}
