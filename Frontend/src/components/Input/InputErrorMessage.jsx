import { ErrorMessage } from "@hookform/error-message";

export default function InputErrorMessage({ errors, name }) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p key={type} className="text-red-500 py-1">
            {message}
          </p>
        ))
      }
    />
  );
}
