/***
 * styles are located in globals.css
 */
export default function ContentContainer(props) {
    return (
        <div className='main'>
            <div className='container'>
                {props.children}
            </div>
        </div>
    )
}