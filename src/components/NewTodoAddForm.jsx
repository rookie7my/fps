import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormErrorMessage from "./FormErrorMessage";

export default function NewTodoAddForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [newTodoAddFormFieldName.NAME]: "",
      [newTodoAddFormFieldName.HOUR]: "0",
      [newTodoAddFormFieldName.MINUTE]: "0",
      [newTodoAddFormFieldName.SECOND]: "0",
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="todo-name">할 일</label>
        <input
          id="todo-name"
          type="text"
          placeholder="할 일을 추가하세요. 예를 들면, 프로그래밍 공부하기"
          {...register(
            newTodoAddFormFieldName.NAME,
            newTodoAddFormFieldValidation[newTodoAddFormFieldName.NAME],
          )}
        />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.NAME]?.message} />
      </div>
      <fieldset>
        <legend>계획 시간</legend>
        <input
          id="todo-time-hour"
          type="number"
          min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR].min.value}
          max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR].max.value}
          {...register(
            newTodoAddFormFieldName.HOUR,
            newTodoAddFormFieldValidation[newTodoAddFormFieldName.HOUR],
          )}
        />
        <span>:</span>
        <input
          id="todo-time-minute"
          type="number"
          min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE].min.value}
          max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE].max.value}
          {...register(
            newTodoAddFormFieldName.MINUTE,
            newTodoAddFormFieldValidation[newTodoAddFormFieldName.MINUTE],
          )}
        />
        <span>:</span>
        <input
          id="todo-time-second"
          type="number"
          min={newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND].min.value}
          max={newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND].max.value}
          {...register(
            newTodoAddFormFieldName.SECOND,
            newTodoAddFormFieldValidation[newTodoAddFormFieldName.SECOND],
          )}
        />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.HOUR]?.message} />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.MINUTE]?.message} />
        <FormErrorMessage errorMessage={errors[newTodoAddFormFieldName.SECOND]?.message} />
      </fieldset>
      <button type="submit">할 일 추가</button>
    </form>
  );
}

NewTodoAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const newTodoAddFormFieldName = Object.freeze({
  NAME: "todoName",
  HOUR: "todoTimeHour",
  MINUTE: "todoTimeMinute",
  SECOND: "todoTimeSecond",
});

const newTodoAddFormFieldValidation = {
  [newTodoAddFormFieldName.NAME]: {
    required: {
      value: true,
      message: "할 일을 입력해주세요.",
    },
  },
  [newTodoAddFormFieldName.HOUR]: {
    required: {
      value: true,
      message: "시간을 입력해주세요.",
    },
    min: {
      value: 0,
      message: "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
    max: {
      value: 2,
      message: "시간을 0~2 사이로 입력해주세요. 3시간이 넘는 계획은 무리한 계획일 수 있습니다.",
    },
  },
  [newTodoAddFormFieldName.MINUTE]: {
    required: {
      value: true,
      message: "분을 입력해주세요.",
    },
    min: {
      value: 0,
      message: "분은 0~59 사이 값이여야 합니다.",
    },
    max: {
      value: 59,
      message: "분은 0~59 사이 값이여야 합니다.",
    },
  },
  [newTodoAddFormFieldName.SECOND]: {
    required: {
      value: true,
      message: "초를 입력해주세요.",
    },
    min: {
      value: 0,
      message: "초는 0~59 사이 값이여야 합니다.",
    },
    max: {
      value: 59,
      message: "초는 0~59 사이 값이여야 합니다.",
    },
  },
};
