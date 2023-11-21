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
    useToast
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate,useHistory } from "react-router-dom";
import { createTasks, getTasks } from "../../../../Redux/AppContext/actions";

const initialTaskState = {
    title: "",
    description: "",
    task_status: "todo",
    tags: ["Teams"],
    Date: "",
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

const CreateProject = ({ isOpen, onClose }) => {

    const [taskState, setTaskState] = useReducer(taskReducer, initialTaskState);
    const tagList = useSelector((state) => state.AppReducer.tags);
    const tasks = useSelector((store) => store.AppReducer.tasks);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useHistory();
    const toast = useToast();
    if(taskState.userID === ""){
        setTaskState({ type: 'userID', payload: localStorage.getItem("userEmail") });
    }


    const createTaskHandler = () => {
        if(taskState.title !== "" && 
        taskState.description !=="" && 
        taskState.task_status !== "" && 
        taskState.tags !== "" && 
        taskState.Date !== ""){

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
                if(location.pathname !== "//#/admin/list-task"){
                    navigate.push("/admin/list-task");
                    onClose()
                }
                else{
                    navigate.push("/admin/list-task");
                    onClose()
                };
                // onClose()
            });
        }
        else{
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* title  */}

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Enter Name"
                            value={taskState.title}
                            onChange={(e) => setTaskState({ type: 'title', payload: e.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>List Task</FormLabel>
                            <Input
                                placeholder="Enter List Task"
                                value={taskState.description}
                                onChange={(e) => setTaskState({ type: 'description', payload: e.target.value })}
                            />
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>Add Member</FormLabel>
                            <Input
                                placeholder="Enter Gmail"
                                value={taskState.description1}
                                onChange={(e) => setTaskState({ type: 'description1', payload: e.target.value })}
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

                    <Box mb="0.5rem" mt={5}>
                        <FormLabel>Priority</FormLabel>
                        <Select
                            placeholder="Select Priority"
                            value={taskState.task_status}
                            onChange={(e) => setTaskState({ type: 'task_status', payload: e.target.value })}
                        >
                            <option value="todo">High</option>
                            <option value="progress">Medium</option>
                            <option value="done">Low</option>
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
                            <option value="Personal">Public</option>
                            <option value="Teams">Private</option>
                        </Select>
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue'onClick={createTaskHandler}>Create</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
};

export { CreateProject };
