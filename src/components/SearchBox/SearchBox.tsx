import React, { useRef, useEffect, useCallback } from "react";

const SearchBox = ({ maps, onPlacesChanged, placeholder }: any) => {
  const input = useRef(null);
  const searchBox = useRef<any>(null);

  const handleOnPlacesChanged = useCallback(() => {
    if (onPlacesChanged && searchBox?.current?.getPlaces) {
      onPlacesChanged(searchBox.current.getPlaces());
    }
  }, [onPlacesChanged, searchBox]);

  useEffect(() => {
    if (!searchBox.current && maps) {
      searchBox.current = new maps.places.SearchBox(input.current);
      searchBox.current.addListener("places_changed", handleOnPlacesChanged);
    }

    return () => {
      if (maps) {
        searchBox.current = null;
        maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [maps, handleOnPlacesChanged]);

  return <input ref={input} placeholder={placeholder} type="text" />;
};

export default SearchBox;
