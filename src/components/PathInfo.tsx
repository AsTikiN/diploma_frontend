import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Map from "./Map";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Saunter } from "../types";
import Button from "./Button/Button";
import { useActions } from "../hooks/useActions";
import { ref, update } from "firebase/database";
import { DatabaseContext } from "../App";

const PathInfo: FC = (): ReactElement => {
  const { saunterList: data, selectedItem: selectedId } = useSelector(
    (state: any) => state.saunterReducer
  );
  const [currentPath, setCurrentPath] = useState<Saunter | null>(null);
  const { addToFavorites, removeSaunter } = useActions();

  const database = useContext(DatabaseContext);

  useEffect(() => {
    if (!data || !selectedId) return;
    setCurrentPath(data.find((saunter: Saunter) => saunter.id === selectedId));
  }, [selectedId, data]);

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentPath) return;

    const updates = {};
    // @ts-ignore
    updates[`/saunters/${currentPath.id}/isFavourite`] = true;
    update(ref(database), updates).then(
      addToFavorites.bind(null, currentPath?.id)
    );

    addToFavorites(currentPath?.id);
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentPath) return;

    const updates = {};
    // @ts-ignore
    updates[`/saunters/${currentPath.id}`] = null;
    update(ref(database), updates).then(
      removeSaunter.bind(null, currentPath?.id)
    );
    setCurrentPath(null);
  };

  if (!currentPath) return <Wrapper>select any path</Wrapper>;

  return (
    <Wrapper>
      <MainInfo>
        <PathTitle>{currentPath?.title}</PathTitle>
        <PathDistance>{JSON.parse(currentPath?.path).len}</PathDistance>
      </MainInfo>
      <Description>
        <PathDescription>{currentPath?.fullDesc}</PathDescription>
      </Description>
      <MapWrapper>
        {/* <Map path={currentPath?.path} editMode={false}/> */}
      </MapWrapper>
      <BtnToRight>
        <Button variant="text" onClick={handleFavouriteClick}>
          add to favorites
        </Button>
      </BtnToRight>
      <BtnToRight>
        <Button variant="text" onClick={handleRemoveClick}>
          Remove
        </Button>
      </BtnToRight>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "50%",
  padding: "20px",

  ["@media (max-width:768px)"]: {
    // eslint-disable-line no-useless-computed-key
    width: "100%",
    padding: 0,
  },
});

const PathTitle = styled("div")({
  fontSize: "24px",
  fontWeight: 600,
});

const PathDistance = styled("div")({
  fontSize: "24px",
  fontWeight: 600,
});

const PathDescription = styled("div")({
  fontSize: "12px",
});

const MainInfo = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const Description = styled("div")({
  marginTop: "20px",
});

const BtnToRight = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const MapWrapper = styled("div")({
  width: "100%",
  height: "400px",
  marginTop: "20px",
});

export default PathInfo;
