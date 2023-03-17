import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core"
import { CoursesArtifact } from "../../artifacts/Courses";

const { address, abi } = CoursesArtifact
const useCourses = () => {
    
    const { active, library, chainId } = useWeb3React()
    const courses = useMemo(() => {
        if (active) {
            return new library.eth.Contract(abi, address[chainId])  
        } 
    }, [active, chainId, library?.eth?.Contract])
    return courses
}

export default useCourses