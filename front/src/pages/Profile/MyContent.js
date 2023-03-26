import { useState, useEffect } from 'react'
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
    Spinner,
    Center
} from "@chakra-ui/react"
import FilePicker from "chakra-ui-file-picker";
import { saveImageToFileCoin } from "../../utils";
import Swal from "sweetalert2";

export default function MyContent({ onCreateCourse, courseCreated, isLoading }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [mainImage, setMainImage] = useState('')
    const [video, setVideo] = useState('')
    const [isUploading, setIsUploading] = useState()


    const createCourse = () => {

        onCreateCourse({ title, description, price, mainImage, video })

    }

    useEffect(() => {
        if (courseCreated) {
            Swal.fire('Content created successfully')

            onClose()
        }
    }, [courseCreated])
    return (
        <>
            <Button onClick={onOpen}>Add new content</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new content</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p={8}>
                            <Stack spacing={4}>
                                <HStack>
                                    <FormControl id="title" isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" onChange={(e) => setTitle(e.target.value)} />
                                    </FormControl>
                                    <FormControl id="price" isRequired>
                                        <FormLabel>Price</FormLabel>
                                        <Input type="number" onChange={(e) => setPrice(e.target.value)} />
                                    </FormControl>
                                </HStack>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea onChange={(e) => setDescription(e.target.value)} />
                                </FormControl>

                                <FormControl id="pictures" isRequired>
                                    <HStack>
                                        <FilePicker
                                            onFileChange={async (fileList) => {
                                                try {
                                                    setIsUploading(true)
                                                    const cid = await saveImageToFileCoin(fileList)
                                                    setMainImage(cid)
                                                    setIsUploading(false)
                                                } catch (err) {
                                                    Swal.fire('There was an error uploading the image')
                                                    setIsUploading(false)
                                                }
                                            }}
                                            placeholder={"Content Image"}
                                            clearButtonLabel='clear'
                                            multipleFiles={false}
                                            hideClearButton={false}
                                        />

                                    </HStack>
                                </FormControl>

                                <FormControl id="video" isRequired>
                                    <HStack>
                                        <FilePicker
                                            onFileChange={async (fileList) => {
                                                try {
                                                    setIsUploading(true)
                                                    const cid = await saveImageToFileCoin(fileList)
                                                    setVideo(cid)
                                                    setIsUploading(false)
                                                } catch (err) {
                                                    setIsUploading(false)
                                                    Swal.fire('There was an error uploading the image')
                                                }
                                            }}
                                            placeholder={"Content Video"}
                                            clearButtonLabel='clear'
                                            multipleFiles={false}
                                            accept="video/mp4"
                                            hideClearButton={false}
                                        />

                                    </HStack>
                                </FormControl>
                                <Center>
                                </Center>
                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            colorScheme='blue'
                            isLoading={isLoading || isUploading}
                            onClick={createCourse}
                        >
                            Create content
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}