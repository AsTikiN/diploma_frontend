import { styled, Modal as MuiModal, Box } from "@mui/material";
import React, { ReactElement, FC, useState, useContext } from "react";
import Button from "../Button/Button";
import { VscChromeClose } from "react-icons/vsc";
import DefaultInput from "../Input/DefaultInput";
import TextArea from "../Input/TextArea";
import { TbMapSearch } from "react-icons/tb";
import { BsCheckLg } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import Map from "../Map";
import { useActions } from "../../hooks/useActions";
import { DatabaseContext } from "../../App";
import { child, get, onValue, ref, set, push, update } from "firebase/database";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<Props> = ({ open, setOpen }): ReactElement => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => setOpen(false);
  const [title, setTitle] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [fullDesc, setFullDesc] = useState<string>("");
  const [markerMode, setMarkerMode] = useState<boolean>(false);
  const [path, setPath] = useState<any>();
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 48.460255107435785,
      lng: 35.044156794967655,
    },
    zoom: 14,
  });
  const [mapRoute, setMapRoute] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [driver, setDriver] = useState({
    isLoading: false,
    name: "Alexandr",
    avatar: "",
  });
  const [freeDrives, setFreeDrives] = useState([]);

  const database = useContext(DatabaseContext);
  const { addSaunter } = useActions();

  const handleAddMarkerClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setMarkerMode(!markerMode);
  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const unicId = Math.round(Math.random() * 10000);
    const newSaunter = {
      id: unicId,
      title: title,
      shortDesc: shortDesc,
      fullDesc: fullDesc,
      isFavourite: false,
      path: JSON.stringify(path),
    };
    console.log(200200, newSaunter);
    if (!shortDesc || !fullDesc || !path || !title) {
      throw new Error("All fields should be selected");
    }

    set(ref(database, `saunters/${unicId}`), newSaunter).then(
      addSaunter.bind(null, newSaunter)
    );

    resetModelData();
    setOpen(false);
  };

  const resetModelData = () => {
    setTitle("");
    setShortDesc("");
    setFullDesc("");
    setMarkerMode(false);
    setPath(null);
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box>
        <ModalHeader>
          <Title>Add new path</Title>

          <Close onClick={handleClose}>
            <VscChromeClose />
          </Close>
        </ModalHeader>

        <Wrapper>
          <FormWrapper>
            <Form>
              <DefaultInput
                fullWidth
                placeholder="Text input"
                label="Title"
                value={title}
                setValue={setTitle}
              ></DefaultInput>
              <TextArea
                size="small"
                label="Short description"
                limit={160}
                value={shortDesc}
                setValue={setShortDesc}
                placeholder="Text area"
              ></TextArea>
              <TextArea
                size="large"
                label="Full description"
                value={fullDesc}
                setValue={setFullDesc}
                placeholder="Text area"
              ></TextArea>
            </Form>

            <Distance>
              <TbMapSearch /> Length {path ? path.len : "0 km"}
            </Distance>

            <Sumbit>
              <Button variant="contained" onClick={handleSubmitClick}>
                <>
                  <BsCheckLg />
                  Add path
                </>
              </Button>
            </Sumbit>
          </FormWrapper>

          <MapWrapper>
            <EditModeButton>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddMarkerClick}
              >
                <>
                  <FaMapMarkerAlt />
                  Add marker
                </>
              </Button>
            </EditModeButton>
            <Map
              defaultProps={defaultProps}
              setDefaultProps={setDefaultProps}
              mapRoute={mapRoute}
              setMapRoute={setMapRoute}
              markers={markers}
              setMarkers={setMarkers}
              editMode={true}
              setPath={setPath}
              path={path}
            />
          </MapWrapper>
        </Wrapper>
      </Box>
    </CustomModal>
  );
};

const Wrapper = styled("div")({
  padding: "20px",
  display: "flex",

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    flexWrap: "wrap",
  },
});

const CustomModal = styled(MuiModal)({
  "& .MuiBox-root": {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxHeight: "95%",
    overflowY: "scroll",
    maxWidth: "1440px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "none",
  },
});

const ModalHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: "1px solid #000",
});

const FormWrapper = styled("div")({
  width: "50%",
  padding: "20px",

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    width: "100%",
    order: 2,
    padding: 0,
    marginTop: "30px",
  },
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Distance = styled("div")({
  textAlign: "center",
  fontSize: "28px",
  marginTop: "60px",
});

const Sumbit = styled("div")({
  marginTop: "60px",
  textAlign: "center",

  "& svg": {
    marginRight: "8px",
  },
});

const MapWrapper = styled("div")({
  padding: "20px",
  maxHeight: "100%",
  position: "relative",
  width: "50%",
  height: "650px",

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    width: "100%",
    order: 1,
    padding: 0,
  },
});

const EditModeButton = styled("div")({
  position: "absolute",
  left: "30px",
  top: "80px",
  zIndex: "1",
  width: "200px",

  "& svg": {
    marginRight: "8px",
  },

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    left: "10px",
  },
});

const Title = styled("div")({});

const Close = styled("div")({});

export default Modal;
