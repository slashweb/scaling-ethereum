import {useState, useCallback, useEffect} from 'react'
import {
    useDisclosure,
    Box,
    Stack,
    Heading,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    HStack,
    FormControl,
    FormLabel,
    Textarea,
} from "@chakra-ui/react"
import FilePicker from "chakra-ui-file-picker";
import {guid, makeStorageClient, renameFile, saveImageToFileCoin} from "../../utils";

export default function MyContent({onCreateCourse}) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')

    const createCourse = () => {
        onCreateCourse({title, description, price})
    }




    return (
        <>
            <Heading>My Content</Heading>
            <Button onClick={onOpen}>Add new content</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create new content</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Box
                            p={8}>
                            <Stack spacing={4}>
                                <HStack>
                                    <FormControl id="title" isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" onChange={(e) => setTitle(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="price" isRequired>
                                        <FormLabel>Price</FormLabel>
                                        <Input type="number" onChange={(e) => setPrice(e.target.value)}/>
                                    </FormControl>
                                </HStack>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea onChange={(e) => setDescription(e.target.value)}/>
                                </FormControl>

                                <FormControl id="pictures" isRequired>
                                    <HStack>
                                        <FilePicker
                                            onFileChange={async (fileList) => {
                                                saveImageToFileCoin(fileList)
                                            }}
                                            placeholder={"Content Image"}
                                            clearButtonLabel='browse'
                                            multipleFiles={false}
                                            accept="image/jpg"
                                            hideClearButton={false}
                                        />

                                    </HStack>
                                    {
                                        images.map((tag, index) => {
                                            return <HStack mt={2} key={index}>
                                                <Input value={tag} onChange={(e) => {
                                                    const localTags = [...images]
                                                    localTags[index] = e.target.value
                                                    setImages(localTags)
                                                }}/>
                                                <Button size={'sm'} colorScheme={'red'} onClick={() => {
                                                    const localTags = [...images]
                                                    localTags.splice(index, 1)
                                                    setImages(localTags)
                                                }}>
                                                    Delete
                                                </Button>
                                            </HStack>
                                        })
                                    }
                                </FormControl>
                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={() => {
                            createCourse()
                        }
                        }>Create content</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}