import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

import { type TasksDispatch, type SelectedTask } from "./TasksManager";
import {
  convertHourMinuteSecondIntoSecond,
  convertSecondIntoHourMinuteSecond,
  type HourMinuteSecond,
} from "../utils/time";

type UpdateSelectedTaskFormProps = {
  selectedTask: SelectedTask;
  onClose: () => void;
  dispatch: TasksDispatch;
};

type UpdateSelectedTaskFormData = {
  name: string;
  time: HourMinuteSecond;
};

const MIN_HOUR = 0;
const MAX_HOUR = 23;
const MIN_MINUTE = 0;
const MAX_MINUTE = 59;
const MIN_SECOND = 0;
const MAX_SECOND = 59;

export default function UpdateSelectedTaskForm({
  selectedTask,
  onClose,
  dispatch,
}: UpdateSelectedTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<UpdateSelectedTaskFormData>({
    defaultValues: {
      name: selectedTask.name,
      time: convertSecondIntoHourMinuteSecond(
        selectedTask.scheduledTimeInSecond
      ),
    },
    mode: "onChange",
  });

  const timeFieldSet = watch("time");

  const isTimeFieldSetZero =
    convertHourMinuteSecondIntoSecond(timeFieldSet) === 0;

  const hasTimeFieldSetError = Boolean(errors.time) || isTimeFieldSetZero;

  const handleValid = (data: UpdateSelectedTaskFormData): void => {
    if (convertHourMinuteSecondIntoSecond(data.time) === 0) {
      return;
    }

    const {
      name,
      time: { hour, minute, second },
    } = data;
    dispatch({
      type: "tasks/selectedTaskUpdated",
      payload: {
        task: { name, hour, minute, second },
      },
    });
    onClose();
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(handleValid)}
      direction="column"
      rowGap={6}
    >
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>할 일</FormLabel>
        <Input
          type="text"
          placeholder="할 일을 수정하세요"
          {...register("name", {
            setValueAs: (nameInput) => nameInput.trim(),
            required: "할 일의 새 이름을 입력해주세요",
            maxLength: {
              value: 30,
              message: "30자 이하로 입력해주세요",
            },
          })}
        />
        {errors.name ? (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        ) : (
          <FormHelperText>
            할 일을 <Text as="strong">30자 이하</Text>로 입력해주세요
          </FormHelperText>
        )}
      </FormControl>
      <FormControl as="fieldset" isInvalid={hasTimeFieldSetError}>
        <FormLabel as="legend">계획 시간</FormLabel>
        <Flex columnGap={1} alignItems="center">
          <Controller
            name="time.hour"
            render={({ field }) => (
              <NumberInput
                min={MIN_HOUR}
                max={MAX_HOUR}
                {...field}
                onChange={(hourAsString) => {
                  const hourAsInteger = Number(hourAsString.replace(/\D/g, ""));
                  field.onChange(hourAsInteger);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
            control={control}
            rules={{
              max: {
                value: MAX_HOUR,
                message: `시간을 ${MAX_HOUR}이하로 입력해주세요`,
              },
            }}
          />
          <Text as="span">:</Text>
          <Controller
            name="time.minute"
            render={({ field }) => (
              <NumberInput
                min={MIN_MINUTE}
                max={MAX_MINUTE}
                {...field}
                onChange={(minuteAsString) => {
                  const minuteAsInteger = Number(
                    minuteAsString.replace(/\D/g, "")
                  );
                  field.onChange(minuteAsInteger);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
            control={control}
            rules={{
              max: {
                value: MAX_MINUTE,
                message: `분을 ${MAX_MINUTE}이하로 입력해주세요`,
              },
            }}
          />
          <Text as="span">:</Text>
          <Controller
            name="time.second"
            render={({ field }) => (
              <NumberInput
                min={MIN_SECOND}
                max={MAX_SECOND}
                {...field}
                onChange={(secondAsString) => {
                  const secondAsInteger = Number(
                    secondAsString.replace(/\D/g, "")
                  );
                  field.onChange(secondAsInteger);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
            control={control}
            rules={{
              max: {
                value: MAX_SECOND,
                message: `초를 ${MAX_SECOND}이하로 입력해주세요`,
              },
            }}
          />
        </Flex>
        {!hasTimeFieldSetError ? (
          <FormHelperText>
            <Text as="strong">00:00:01 이상 23:59:59 이하</Text>의 계획 시간을
            입력해주세요
          </FormHelperText>
        ) : null}
        {isTimeFieldSetZero ? (
          <FormErrorMessage>
            계획 시간은 00:00:00일 수 없습니다
          </FormErrorMessage>
        ) : null}
        {errors.time?.hour ? (
          <FormErrorMessage>{errors.time.hour.message}</FormErrorMessage>
        ) : null}
        {errors.time?.minute ? (
          <FormErrorMessage>{errors.time.minute.message}</FormErrorMessage>
        ) : null}
        {errors.time?.second ? (
          <FormErrorMessage>{errors.time.second.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Button type="submit" colorScheme="main" size="md" variant="solid">
        수정하기
      </Button>
    </Flex>
  );
}
