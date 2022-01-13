import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

export default function MyDropzone( {getFiles} ) {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        getFiles(acceptedFiles);
    })

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accepts: "images/*",
        multiple: false,
    });
    
    return(
        <div {...getRootProps()} className="Dropzone" style={isDragActive ? activeStyle : {}}>
            <input {...getInputProps()} />
            Drop item image here 
        </div>
    );
}

const activeStyle = {
    borderStyle: "solid",
    opacity: "0.5"
}
