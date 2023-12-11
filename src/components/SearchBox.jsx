import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { rarityColor } from "../constants/colors";
import { tiers } from "../lib/ProfileFunctions";

const SearchBox = ({ itemList, selectedItem, onItemChange, recombob, placeholder, inputFontSize, maxWidth }) => {
  const item = selectedItem || itemList[0];
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const [displayItems, setDisplayItems] = useState(itemList);
  const completeList = useRef(itemList);
  const actualItem = useRef(item);
  const [displayItemName, setDisplayItemName] = useState(item.name || item);
  const inputFocusedRef = useRef(false);
  const dropdownFocusedRef = useRef(false);
  const indicatorFocusedRef = useRef(false);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tier, setTier] = useState(recombob ? tiers[tiers.indexOf(item.tier) + 1 != -1 || tiers.indexOf(item.tier)] : item.tier ?? "COMMON");

  useEffect(() => {
    getItemTier(actualItem.current.tier);
  }, [recombob]);

  useEffect(() => {
    if (selectedItem !== undefined) {
      const item = selectedItem;
      setDisplayItemName(item?.name || item);
      actualItem.current = item;
      getItemTier(item.tier);
    }
  }, [selectedItem]);

  const getItemTier = (tier) => {
    const tierIndex = tiers.indexOf(tier);
    if (tiers[tierIndex + 1]) {
      setTier(recombob ? tiers[tierIndex + 1] : tier);
    } else {
      setTier(tier);
    }
  };

  const handleInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    setDisplayItemName(input);
    setActiveIndex(0);
    const matchedItems = completeList.current.filter((item) => {
      return (item.name ?? item).toLowerCase().includes(input);
    });

    setDisplayItems(matchedItems);
  };

  const handleItemSelect = (index) => {
    const item = displayItems[index];
    setDropdownVisible(false);
    dropdownFocusedRef.current = false;
    setDisplayItems(completeList.current);
    !selectedItem && setDisplayItemName(item.name || item);
    onItemChange && onItemChange(item.id || item);
  };

  const resetDisplay = () => {
    setActiveIndex(0);
    setDropdownVisible(false);
    setDisplayItemName(actualItem.current.name || actualItem.current);
    setDisplayItems(completeList.current);
  };

  const handleFocusLost = (focusRef) => {
    focusRef.current = false;
    if (dropdownFocusedRef.current === false && inputFocusedRef.current === false && indicatorFocusedRef.current === false) {
      resetDisplay();
    }
  };

  const handleSearchBoxClick = () => {
    if (!inputFocusedRef.current) {
      setDropdownVisible(true);
      setDisplayItemName("");
      inputFocusedRef.current = true;
    }
  };

  const handleIndicatorClick = () => {
    if (dropDownVisible) {
      resetDisplay();
      dropdownFocusedRef.current = false;
      inputFocusedRef.current = false;
    } else {
      setDropdownVisible(true);
      setDisplayItemName("");
      indicatorFocusedRef.current = true;
    }
  };

  const handleKeyDown = (event) => {
    if ((event.key === "Tab" || event.key === "Enter") && displayItems[0]) {
      inputFocusedRef.current = false;
      handleItemSelect(activeIndex);
    } else if (event.key === "Escape") {
      resetDisplay();
      dropdownFocusedRef.current = false;
      inputFocusedRef.current = false;
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const handleKeyNavigation = (key) => {
    setActiveIndex((cur) => {
      let nextIndex = cur;
      if (key.key === "ArrowUp") {
        nextIndex = Math.max(0, cur - 1);
      } else if (key.key === "ArrowDown") {
        nextIndex = Math.min(cur + 1, displayItems.length - 1);
      }
      const scrollOffset = 25 * nextIndex;
      // 300 is height of dropdown and 25 is the height if each dropdown item
      if (scrollRef.current) {
        // scroll up to the next item
        if (scrollOffset < scrollRef.current.scrollTop) {
          scrollRef.current.scrollTop = scrollOffset;
        }
        // scroll down to the next item
        else if (scrollOffset >= scrollRef.current.scrollTop + 300) {
          scrollRef.current.scrollTop = scrollOffset + 25 - 300;
        }
      }
      return nextIndex;
    });
  };

  return (
    <div
      className='SearchBox'
      style={{ maxWidth: maxWidth && maxWidth }}
      onKeyDown={(e) => {
        handleKeyNavigation(e);
      }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type='text'
          className='SearchBox-Input'
          onMouseDown={handleSearchBoxClick}
          onKeyDown={handleKeyDown}
          readOnly={!inputFocusedRef.current}
          onBlur={() => handleFocusLost(inputFocusedRef)}
          style={{
            fontSize: inputFontSize && inputFontSize,
            color: !inputFocusedRef.current && rarityColor[tier],
            cursor: dropDownVisible ? "text" : "pointer",
          }}
          placeholder={actualItem.current !== "" ? placeholder || "Type to search" : "loading"}
          value={`${displayItemName.replaceAll("_", " ").toLowerCase()}`}
          onChange={handleInputChange}
        />
        <span
          tabIndex={0}
          onMouseDown={handleIndicatorClick}
          onBlur={() => handleFocusLost(indicatorFocusedRef)}
          className='SearchBox-Dropdown-Indicator'>
          {dropDownVisible ? "-" : "+"}
        </span>
      </div>

      {dropDownVisible && (
        <ul
          onMouseDown={() => {
            dropdownFocusedRef.current = true;
          }}
          onBlur={() => {
            handleFocusLost(dropdownFocusedRef);
          }}
          tabIndex={0}
          className='SearchBox-Dropdown'
          ref={scrollRef}>
          {displayItems.map((item, index) => (
            <li
              onClick={() => handleItemSelect(index)}
              className='SearchBox-Dropdown-item'
              onMouseMoveCapture={() => setActiveIndex(index)}
              style={{ color: rarityColor[item.tier] ?? "white", backgroundColor: index === activeIndex && "rgb(32, 113, 124)" }}
              key={index}>
              {item.name?.replaceAll("_", " ").toLowerCase() || item.replaceAll("_", " ").toLowerCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
