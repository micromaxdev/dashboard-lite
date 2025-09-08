import { Button } from '@material-ui/core';
import React from 'react'
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner';
import { updateParts, reset, getPartsOne } from '../../features/all/allSlice';
import { useEffect } from 'react'

const UploadImage = ({ itemNo }) => {

    const [imageNew, setImageNew] = React.useState('');

    const dispatch = useDispatch()

    const { parts, isLoading, isError, message } = useSelector(
        (state) => state.all
    )

    const [part, setPart] = React.useState('');


    function updatePart() {

        var image = imageNew;

        console.log('itemNo');
        console.log(itemNo);
        var data = { itemNo, image }

        try {
            dispatch(updateParts(data))
            window.location.reload(false);
        } catch (error) {

        }

    }

    // --------------------------useEffects----------------------------


    useEffect(() => {

        setPart(parts?.find((p) => p.itemNo === itemNo))

    }, [itemNo])

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div className='mt-5'>

            {itemNo && (
            part?.image ?
                (<>
                    <div className='w-1/3'>
                        <img src={part?.image} alt="" />
                    </div>
                </>)
                :
                (<>
                    <div className='mb-3 font-bold text-lg text-blue-700'>
                        Upload Image
                    </div>
                    <div className='mb-5'>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setImageNew(base64)} />
                    </div>

                    <Button variant="contained" color="secondary"
                        onClick={() => updatePart()}
                        sx={{
                            m: 0, boxShadow: 3,
                            '&:hover': { bgcolor: "#ff8f00" },
                        }}>
                        Submit
                    </Button>
                </>
                )
            
            )}

        </div >
    )
}

export default UploadImage