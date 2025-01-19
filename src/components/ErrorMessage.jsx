import { Show } from 'solid-js';

function ErrorMessage(props) {
  const { errorMessage } = props;

  return (
    <Show when={errorMessage()}>
      <div class="bg-error/10 text-error p-4 rounded mb-8 text-lg">
        {errorMessage()}
      </div>
    </Show>
  );
}

export default ErrorMessage;