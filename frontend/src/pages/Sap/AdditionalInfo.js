import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImg, getPdf } from "../../features/all/allSlice";
import { Button } from "flowbite-react/lib/cjs/components";
import { Icon } from "@iconify/react";
import Spinner from "../../components/Spinner";
const AdditionalInfo = ({ itemNo }) => {
  //------------------ATTRIBUTES/VARIABLES------------------

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.all);

  const [image, setImage] = React.useState(<></>);

  function retrievePdf() {
    dispatch(getPdf(itemNo));
  }

  function getImg() {
    console.log("getting image");
    console.log(itemNo);
    setImage(
      <>
        <img
          src={`/upload/parts/${itemNo}/${itemNo}.JPG`}
          onError={(e) => (e.target.style.display = "none")}
          alt=""
        />

        <img
          src={`/upload/parts/${itemNo}/${itemNo}.jpg`}
          onError={(e) => (e.target.style.display = "none")}
          alt=""
        />

        <img
          src={`/upload/parts/${itemNo}/${itemNo}.png`}
          onError={(e) => (e.target.style.display = "none")}
          alt=""
        />

        <img
          src={`/upload/parts/${itemNo}/${itemNo}.PNG`}
          onError={(e) => (e.target.style.display = "none")}
          alt=""
        />
      </>
    );
  }
  useEffect(() => {
    getImg();
  }, [itemNo]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="pt-2 flex items-center">
        <div className="flex-block">
          <div className="ml-5 mb-3">
            <Button onClick={() => retrievePdf()}>
              Get PDF
              <Icon icon="bxs:file-pdf" className="ml-2 h-5 w-5" />
            </Button>
          </div>
          {image}
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
