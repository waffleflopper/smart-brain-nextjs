import {useEffect, useState, useRef} from 'react'
import styles from '../styles/Recog.module.css'

const FaceRecognitionDisplay = ({boxes, image}) => {
    const [boxDivs, setBoxDivs] = useState([])

    const imageElement = useRef(null)

    //when we get new boxes this triggers a render so we get our array of divs
    useEffect(() => {
        setBoxDivs(calculateBoxes(boxes))
    }, [boxes])


    const calculateBoxes = (boxes) => {
        let width = Number(imageElement.current.width);
        let height = Number(imageElement.current.height)
        let boundingBoxes = []
    
        if (boxes !== []) {
            for (let box of boxes) {
                let leftCol = box.left_col * width;
                let topRow = box.top_row * height;
                let rightCol = width - (box.right_col * width);
                let botRow = height - (box.bottom_row * height);
                let key = leftCol + topRow + rightCol + botRow;
                boundingBoxes = [...boundingBoxes, <div className="boundingBox" style={{top: topRow, right: rightCol, bottom: botRow, left: leftCol}} key={key}></div>]
            }
        }
    
        return boundingBoxes
        
    }

        return (
            <div className={styles.container}>
                <img className={styles.MainImage} ref={imageElement} src={image} />
                {boxDivs}
            </div>
        )

}

export default FaceRecognitionDisplay