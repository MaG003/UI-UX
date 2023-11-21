import { ChevronDownIcon } from "@chakra-ui/icons";
import { CheckboxGroup, Checkbox } from "@chakra-ui/react";
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    MenuList,
    MenuOptionGroup,
    ModalFooter,
    MenuItemOption,
    useToast,
    Stack,
    Text,
    Editable,
    EditablePreview,
    EditableInput
} from "@chakra-ui/react";
import { React, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import { createTasks, getTasks } from "../../../../Redux/AppContext/actions";

const initialTaskState = {
    title: "",
    description: "",
    task_status: "High",
    tags: ["Private"],
    Date: "2023-03-13",
    userID: "",
    isValidate: false,
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'title':
            return {
                ...state,
                title: action.payload,
            };

        case 'description':
            return {
                ...state,
                description: action.payload,
            };

        case 'task_status':
            return {
                ...state,
                task_status: action.payload,
            };

        case 'tags':
            return {
                ...state,
                tags: action.payload,
            };

        case 'Date':
            return {
                ...state,
                Date: action.payload,
            };
        case 'userID':
            return {
                ...state,
                userID: action.payload,
            };
        default:
            return state;
    };
};

const EditProject = ({ isOpen, onClose }) => {

    const [taskState, setTaskState] = useReducer(taskReducer, initialTaskState);
    const tagList = useSelector((state) => state.AppReducer.tags);
    const tasks = useSelector((store) => store.AppReducer.tasks);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useHistory();
    const toast = useToast();
    if (taskState.userID === "") {
        setTaskState({ type: 'userID', payload: localStorage.getItem("userEmail") });
    }


    const createTaskHandler = () => {
        if (taskState.title !== "" &&
            taskState.description !== "" &&
            taskState.task_status !== "" &&
            taskState.tags !== "" &&
            taskState.Date !== "") {

            console.log(taskState);

            dispatch(createTasks(taskState))
                .then(() => dispatch(getTasks()))
                .then(() => toast({
                    title: 'Task Created.',
                    description: "We've created your task for you.",
                    status: 'success',
                    duration: 2000,
                    position: "top",
                    isClosable: true,
                }))
                .then(() => {
                    if (location.pathname !== "//#/admin/list-task") {
                        navigate.push("/admin/list-task");
                        onClose()
                    }
                    else {
                        navigate.push("/admin/list-task");
                        onClose()
                    };
                    // onClose()
                });
        }
        else {
            toast({
                title: 'All fields are not there!.',
                description: "Please enter all the fileds.",
                status: 'warning',
                duration: 2000,
                position: "top",
                isClosable: true,
            })
        }
        dispatch(getTasks())
    };

    const [isEditing, setIsEditing] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* title  */}

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Editable
                            defaultValue="UI/UX"
                            onChange={(value) => setTaskState({ type: 'title', payload: value })}

                        >
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>List Task</FormLabel>

                        <Stack direction="column" spacing={2}>
                            <Checkbox
                                isChecked={taskState.design}
                                onChange={() => setTaskState({ type: 'design', payload: !taskState.design })}
                            >
                                Thiết kế giao diện
                            </Checkbox>

                            <Checkbox
                                isChecked={taskState.interactiveChart}
                                onChange={() => setTaskState({ type: 'interactiveChart', payload: !taskState.interactiveChart })}
                            >
                                Vẽ biểu đồ tương tác
                            </Checkbox>

                            <Checkbox
                                isChecked={taskState.codeDesign}
                                onChange={() => setTaskState({ type: 'codeDesign', payload: !taskState.codeDesign })}
                            >
                                Code giao diện
                            </Checkbox>
                        </Stack>
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>Add Member</FormLabel>
                        <Editable
                            defaultValue="leminhvu123@gmail.com, vietdz123@gmail.com"
                            onChange={(value) => setTaskState({ type: 'title', payload: value })}
                        >
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>End Date</FormLabel>
                        <Input
                            name="start-date"
                            type="date"
                            value={taskState.Date}
                            onChange={(e) => setTaskState({ type: 'Date', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* PRIORITY */}

                    <Box mb="0.5rem" mt={5}>
                        <FormLabel>Priority</FormLabel>
                        <Select
                            placeholder="Select Priority"
                            value={taskState.task_status}
                            onChange={(e) => setTaskState({ type: 'task_status', payload: e.target.value })}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Select>
                    </Box>

                    {/* Tags  */}

                    <Box mb="0.5rem" mt={5}>
                        <FormLabel>Status</FormLabel>
                        <Select
                            placeholder="Select Status"
                            value={taskState.tags}
                            onChange={(e) => setTaskState({ type: 'tags', payload: e.target.value })}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </Select>
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={createTaskHandler}>Save</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
};

export { EditProject };
