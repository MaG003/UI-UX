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
import { createTasks, getTasks, getWorkSpace } from "../../../../Redux/AppContext/actions";

// const initialTaskState = {
//     name: "",
//     list_task: "",
//     add_member: "",
//     end_date: "",
//     priority: "High",
//     status: "Private",
// };

// const taskReducer = (state, action) => {
//     switch (action.type) {
//         case 'name':
//             return {
//                 ...state,
//                 name: action.payload,
//             };

//         case 'list_task':
//             return {
//                 ...state,
//                 list_task: action.payload,
//             };

//         case 'add_member':
//             return {
//                 ...state,
//                 add_member: action.payload,
//             };

//         case 'end_date':
//             return {
//                 ...state,
//                 end_date: action.payload,
//             };

//         case 'priority':
//             return {
//                 ...state,
//                 priority: action.payload,
//             };
//         case 'status':
//             return {
//                 ...state,
//                 status: action.payload,
//             };
//         case 'userID':
//             return {
//                 ...state,
//                 userID: action.payload,
//             };
//         default:
//             return state;
//     };
// };

const initialTaskState = {
    name: "",
    listtask: [],
    member: [],
    date: "",
    // priority: "High",
    progress: 0,
    // status: "Private",
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.payload,
            };

        case 'listtask':
            return {
                ...state,
                listtask: action.payload,
            };

        case 'member':
            return {
                ...state,
                member: action.payload,
            };

        case 'date':
            return {
                ...state,
                date: action.payload,
            };
        // case 'priority':
        //     return {
        //         ...state,
        //         priority: action.payload,
        //     };

        case 'progress':
            return {
                ...state,
                progress: action.payload,
            };

        // case 'status':
        //     return {
        //         ...state,
        //         status: action.payload,
        //     };

        default:
            return state;
    };
};


const EditProject = ({ isOpen, onClose }) => {

    const [taskState, setTaskState] = useReducer(taskReducer, initialTaskState);
    // const tagList = useSelector((state) => state.AppReducer.tags);
    // const tasks = useSelector((store) => store.AppReducer.tasks);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useHistory();
    const toast = useToast();
    if (taskState.userID === "") {
        setTaskState({ type: 'userID', payload: localStorage.getItem("userEmail") });
    }
    // const updateFunc = () => {

    //     dispatch(
    //         updateTasks(id, {
    //             title: taskTitle,
    //             description: taskDescription,
    //             DateStart: taskDateStart,
    //             DateEnd: taskDateEnd,
    //             TimeStart: taskTimeStart,
    //             TimeEnd: taskTimeEnd,
    //             tags: taskTags,
    //             task_status: taskStatus,
    //         })
    //     ).then(() => dispatch(getTasks()));

    // }


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
                <ModalHeader>Edit WorkSpace</ModalHeader>
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
                        <Input
                            placeholder="Enter List Task"
                            value={taskState.listtask.join(', ')}
                            onChange={(e) => setTaskState({
                                type: 'listtask',
                                payload: e.target.value.split(',').map(item => item.trim())
                            })} />
                    </FormControl>


                    <FormControl mt={5}>
                        <FormLabel>Add Member</FormLabel>
                        <Input
                            placeholder="Enter Gmail"
                            value={taskState.member.join(', ')}
                            onChange={(e) => setTaskState({
                                type: 'member',
                                payload: e.target.value.split(',').map(item => item.trim()) // Convert input string to array
                            })}
                        />
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

                    {/* <Box mb="0.5rem" mt={5}>
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
                    </Box> */}

                    <FormControl mt={5}>
                        <FormLabel>Process</FormLabel>
                        <Input
                            placeholder="Enter Process"
                            value={taskState.progress}
                            onChange={(e) => setTaskState({ type: 'progress', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* Tags  */}
                    {/* 
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
                    </Box> */}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={createTaskHandler}>Save</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
};

export { EditProject };
