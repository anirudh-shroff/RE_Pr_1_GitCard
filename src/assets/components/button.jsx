const Button = ({ text, fillType = 'solid', url = null, clickHandler = null }) => {

    if (url) {
        return (
            <a href={url} target="_blank" className={`btn btn-${fillType}`}>{text}</a >
        )
    }

    if (clickHandler) {
        return (
            <button onClick={clickHandler} className={`btn btn-${fillType}`}>{text}</button >
        )
    } else {
        return (
            <button className={`btn btn-${fillType}`}>{text}</button >
        )
    }
}

export default Button